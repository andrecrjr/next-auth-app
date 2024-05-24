import {db as prisma} from "@/lib/db"
import bcrypt from 'bcrypt'

import { NextRequest, NextResponse } from "next/server"


export async function POST(request:NextRequest):Promise<NextResponse>{
    const data = await request.json()
    const {name, email, password}:{name:string, email:string, password:string} = data;

    if(!name || !email || !password){
        return NextResponse.json({"error":"Dados invalidos"}, {status:400})
    }

    const isUserExists = await prisma.user.findUnique({
        where:{
            email:email
        }
    })
    if(isUserExists){
        return NextResponse.json({"erro":"Email já existente"}, { status:400 })
    }

    const hashedPassword:string = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
        data:{
            email,
            name,
            hashedPassword
        }
})

    console.log(`USER CREATED ${JSON.stringify(user)}`)

    return NextResponse.json({data:user});

}