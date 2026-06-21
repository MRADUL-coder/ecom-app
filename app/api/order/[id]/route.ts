const db = `${process.env.DB_URL}/${process.env.DB_NAME}`
import IdInterface from "@/interface/id.interface";
import { authOptions } from "@/lib/auth-options";
import serverCatchError from "@/lib/server-catch-error";
import OrderModel from "@/models/order.model";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse as res } from "next/server";

mongoose.connect(db)

export const PUT = async (req: NextRequest, context: IdInterface)=>{
    try {
        const session = await getServerSession(authOptions)
        if(!session)
            return res.json({message: 'Unauthorized'}, {status: 401})

        if(session.user.role !== "admin")
            return res.json({message: 'Unauthorized'}, {status: 401})

        const {id} = await context.params
        const body = await req.json()
        const order = await OrderModel.findByIdAndUpdate(id, {status: body.status}, {new: true})

        if(!order)
            return res.json({message: 'Order not found'}, {status: 404})

        return res.json(order)
    }
    catch(err)
    {
        return serverCatchError(err)
    }
}