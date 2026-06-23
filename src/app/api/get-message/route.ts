import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "../../../lib/dbConnection";
import UserModel from "@/models/User.model";
import { User } from 'next-auth'
import mongoose from "mongoose";

export async function GET(request: Request) {
    await dbConnect()

    const session = await getServerSession(authOptions)

    const user: User = session?.user as User

    if (!session || session.user) {
        return Response.json(
            { success: false, message: 'User not authenticated' },
            { status: 400 }
        )
    }

    const userId = new mongoose.Types.ObjectId(user._id)
    try {
        const user = await UserModel.aggregate(
            [
                { $match: { id: userId } },
                { $unwind: '$message' },
                { $sort: { 'message.createdAt': - 1 } },
                { $group: { _id: '$id', message: { $push: '$message' } } }
            ])
        if (!user || user.length === 0) {
            return Response.json(
                { success: false, message: 'User not found' },
                { status: 500 }
            )
        }

        return Response.json(
            { success: true, message: user[0].message },
            { status: 500 }
        )
    } catch (error) {
        return Response.json(
            { success: false, message: 'Error sending messages' },
            { status: 500 })
    }

}