'use client'
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "./ui/icons";
import { signIn, useSession } from "next-auth/react";

import { useToast } from "./ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";
import GithubLoginButton from "./GithubLoginButton";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement>{

}

interface IUser{
    email: string;
    password:string;
}

export function UserLoginForm({className, ...props}:UserAuthFormProps){
    const [data, setData] = useState<IUser>({
        email:"",
        password:""
    })

    

    const { toast } = useToast()
    const router = useRouter()
    const session = useSession();
    useEffect(()=>{
        console.log("verificando login")
        if(session?.status === "authenticated"){
            router.push("/")
        }
    },[session?.status, router])
    const [isLoading, setisLoading] = useState(false);
    

    async function _onSubmit(e:React.FormEvent){
        e.preventDefault()
        setisLoading(true)

        const response = await signIn<"credentials">("credentials",{...data, redirect:false})
        if(!response?.ok){
             toast({
                title:"Oops!",
                description:response?.error,
                variant:"destructive",
                action:(
                    <ToastAction altText="Tente denovo">Tente Novamente</ToastAction>
                )
            })
            setData({email:"", password:""})
            setisLoading(false)
            return;
        }        
    }

    const handleChange = async (e:React.ChangeEvent<HTMLInputElement>) =>{
        setData(prevData=>{
            return {...prevData, [e.target.name]:e.target.value}
        })
    }

    return (
        <section className={cn("grid gap-6", className)} {...props}>
            
            <form onSubmit={_onSubmit}>
                <div className="grid gap-2">
                    <fieldset className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">E-mail</Label>
                        <Input type="email" 
                            id="email" 
                            autoCapitalize="none"
                            autoCorrect="off"
                            autoComplete="email"
                            disabled={isLoading}
                            name="email"
                            value={data.email}
                            placeholder="E-mail"
                            onChange={handleChange}
                        />
                        </fieldset>
                    <fieldset className="grid gap-1">
                    <Label className="sr-only" htmlFor="password">Password</Label>
                    <Input type="password" 
                        id="password" 
                        autoCapitalize="none"
                        autoCorrect="off"
                        autoComplete="password"
                        disabled={isLoading}
                        name="password"
                        value={data.password}
                        placeholder="Senha"
                        onChange={handleChange}
                    />
                    </fieldset>

                </div>
                
                <Button type="submit" className="w-full mt-4">{isLoading && <Icons.spinner className="mr-2 h-4 animate-spin"/>} Entrar</Button>
                <GithubLoginButton />
            </form>

        </section>
    )

}