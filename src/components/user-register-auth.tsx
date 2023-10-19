'use client'
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "./ui/icons";
import { signIn } from "next-auth/react";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { useRouter } from "next/navigation";


interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement>{

}

interface IUser{
    email: string;
    password:string;
    name: string;
}

export function UserRegisterForm({className, ...props}:UserAuthFormProps){
    const { toast } = useToast()
    const [data, setData] = useState<IUser>({
        email:"",
        password:"",
        name:""
    })

    const [isLoading, setisLoading] = useState(false);
    const router = useRouter()

    

    async function _onSubmit(e:React.FormEvent){
        e.preventDefault()
        setisLoading(true)
        const request = await fetch("/api/users", {
        method: "POST", 
        headers:{
            "Content-type":"aplication/json"
        },
        body: JSON.stringify(data)})
        const response = await request.json();
        if(!request.ok){
            toast({
                title:"Oops!",
                description:response.error,
                variant:"destructive",
                action:(
                    <ToastAction altText="Tente denovo">Tente Novamente</ToastAction>
                )
            })
            setData({email:"", password:"", name:""})
            setisLoading(false)
            return;
        }
    
        console.log(`USER REGISTER: ${JSON.stringify(response.data)}`)
        router.push("/login")
    }

    const handleChange = async (e:React.ChangeEvent<HTMLInputElement>) =>{
        setData(prevData=>{
            return {...prevData, [e.target.name]:e.target.value}
        })
    }

    return (
        <section className={cn("grid gap-6", className)} {...props}>
            
            <form onSubmit={_onSubmit} method="POST">
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
                    <fieldset className="grid gap-1">
                        <Label className="sr-only" htmlFor="name">Name</Label>
                        <Input type="text" 
                            id="name" 
                            autoCapitalize="none"
                            disabled={isLoading}
                            name="name"
                            value={data.name}
                            placeholder="Your Name"
                            onChange={handleChange}
                        />
                        </fieldset>
                    <fieldset className="grid gap-1"></fieldset>
                </div>
                
                <Button type="submit" className="w-full mt-4">{isLoading && <Icons.spinner className="mr-2 h-4 animate-spin"/>} Entrar</Button>
            </form>

        </section>
    )

}