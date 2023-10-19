'use client'
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { Button, buttonVariants } from "./ui/button";

export default function AuthButton({page}:{page:string}) {

    const {data:session, status} = useSession()

    const isAuthenticated = status === "authenticated"

  return (<>
    {!isAuthenticated ? (

        <Link
          href={`/${page === "login" ? "register" :"login"}`}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Sign Up
        </Link>

    ) : (<Button className="absolute top-0 right-10" onClick={()=>{
        signOut({callbackUrl:"/"})
    }} >Sign Out</Button>)}
  </>);
}
