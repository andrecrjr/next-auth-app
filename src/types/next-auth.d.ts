import { DefaultSession } from "next-auth";

export interface GithubProfile {
    login:string;
    email:string;
    image:string;
    location:string;
    url:string;
}
declare module "next-auth" {
  interface Session {
    user?: GithubProfile & DefaultSession["user"];
  }
}