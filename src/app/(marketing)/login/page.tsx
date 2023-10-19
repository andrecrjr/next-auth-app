import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { UserLoginForm } from "@/components/user-login-auth"
import AuthButton from "@/components/AuthButton"

export const metadata: Metadata = {
  title: "Eroshi - Login",
  description: "Eroshi Autenticação com Shadcn-ui, Next Auth, MongoDB",
}

export default function AuthenticationPage() {
  return (
    <>
      <div className="flex container relative h-screen flex-col 
      items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <AuthButton page="login"/>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            Eroshi INC.
          </div>
          <div className="relative z-20 mt-auto">

          </div>
        </div>
        <div className="items-center self-center lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Faça seu login!
              </h1>
              <p className="text-sm text-muted-foreground">
                Preencha as informações  abaixo para se conectar:
              </p>
            </div>
            <UserLoginForm />
          </div>
        </div>
      </div>
    </>
  )
}