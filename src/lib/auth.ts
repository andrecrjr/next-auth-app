
import { PrismaAdapter } from '@auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import { db } from './db';
import { db as prisma } from './db';
import bcrypt from 'bcrypt'
import { GithubProfile } from '@/types/next-auth';
import { unstable_createNodejsStream } from 'next/dist/compiled/@vercel/og';

export const authOptions:NextAuthOptions = {
    adapter:PrismaAdapter(db as any),
    providers:[GithubProvider({
        clientId: process.env.GITHUB_CLIENTID!,
        clientSecret: process.env.GITHUB_SECRET!,
        async profile(profile, tokens) {
            // adicionando novos dados ao prisma
            return {
                id: profile.id,
                name: profile.name,
                email: profile.email,
                image: profile.avatar_url,
                login: profile.login,
                location: profile.location,
                url: profile.url,
                bio:           profile.bio,
                twitter_username:  profile.twitter_username,
                public_repos:   profile.public_repos,
                public_gists:   profile.public_gists,
                followers :    profile.followers,
                following:    profile.following,
            }
        },
    }),
    Credentials({
        name:"credentials",
        credentials:{
            email: {label:"Email", type:"text", placeholder:"eroshi"},
            password: {label:"Password", type:"password"},
            username: {label:"Name", type:"text", placeholder: "Eroshin"}
        },
        async authorize(credentials, req):Promise<any> {
            // backend to authorize user using prisma DB
            
            if(!credentials?.email || !credentials?.password) throw new Error("Login Data is needed")

            const user = await prisma.user.findUnique({
                where:{
                    email:credentials.email
                }
            })

            if(!user || !user?.hashedPassword){
                throw new Error("User not registered or using third party credentials needs to login with it.")
            }

            const matchPassword = await bcrypt.compare(credentials.password, user.hashedPassword);
            if(!matchPassword) throw new Error("Wrong email or password")

            return {email:user.email};
        },
    })],
    debug:process.env.NODE_ENV === 'development',
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy:"jwt",
    },
    callbacks:{
        jwt: async ({ token, user }) => {
            user && (token.user=user)
            return token;
         },
        async session({session, token}) {
            const userData = token.user;
            if(userData && typeof userData === 'object' && 'login' in userData 
            && 'location' in userData && 'email' in userData){
                session.user = userData as GithubProfile
            }
            
            return session;
        },
    },
    pages:{
        signIn:"/login"
    }
}