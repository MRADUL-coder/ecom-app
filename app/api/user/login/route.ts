
const db=`${process.env.DB_URL}/${process.env.DB_NAME}`
import mongoose from 'mongoose'
mongoose.connect(db)

import ServerCatchError from "@/lib/server-catch-error";
import { NextRequest,NextResponse as res } from "next/server";
import UserModel from '@/models/user.model';
import bcrypt from 'bcrypt'

export const POST=async(req:NextRequest)=>{

    try{
        const body= await req.json()
        const email = body.email
        const password=body.password
        const provider=body.provider
        const user = await UserModel.findOne({email})
 const payload = {
            id: user._id,
            name: user.fullname,
            email: user.email,
            role: user.role
        }
        if(!user)
            return res.json({message:"User not found"},{status:404})

if(provider==="google")
{
      return res.json(payload)
}

        const isLogin = await bcrypt.compare(password,user.password)

        if(!isLogin)
            return res.json({message:"Incorrect Password"},{status:401})
  
      
     
        return res.json(payload)
    }
    catch(err)
    {
        return ServerCatchError(err,500)
    }

}