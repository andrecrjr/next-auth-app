
import { PrismaAdapter } from '@auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import { db } from './db';

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
            console.log(credentials)
            const user = {email:"teste@eroshi.com", password:"123456", name:"Eroshi Junior"};
            return user;
        },
    })],
    debug:process.env.NODE_ENV === 'development',
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy:"jwt"
    }
}