'use client'
import React from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

export default function GithubLoginButton() {
  return <Button className="mt-5 self-center" onClick={ async ()=>{
    await signIn("github", {callbackUrl:"/", redirect:true})

  }}>
    Github
  </Button>;
}
