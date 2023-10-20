import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getSession } from "next-auth/react";


export async function getCurrentUser(){
    const session = await getServerSession(authOptions)
    return {session:session?.user};

}