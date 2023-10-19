
import { PrismaAdapter } from '@auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import { db } from './db';
import { db as prisma } from './db';
import bcrypt from 'bcrypt'

export const authOptions:NextAuthOptions = {
    adapter:PrismaAdapter(db as any),
    providers:[GithubProvider({
        clientId: process.env.GITHUB_CLIENTID!,
        clientSecret: process.env.GITHUB_SECRET!
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
            
            console.log(credentials)
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

            return user;
        },
    })],
    debug:process.env.NODE_ENV === 'development',
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy:"jwt"
    },
    pages:{
        signIn:"/login"
    }
}