import dbConnect from "../../../lib/dbConnection";
import UserModel from "@/models/User.model";
import { Message } from "@/models/User.model";

export async function POST(request: Request) {
    await dbConnect()

    const { username, content } = await request.json()

    try {
        const user = await UserModel.findById({
            username
        })

        if (!user) {
            return Response.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            )
        }
        // check is user accepting message 
        if (!user.isAcceptingMessage) {
            return Response.json(
                { success: true, message: 'User is not accepting message' },
                { status: 404 }
            )
        }
        const newMessage = { content, createdAt: new Date() }
        user.messages.push(newMessage as Message)
        user.save()

        return Response.json(
            { success: false, message: 'Message sent successfully' },
            { status: 201 })

    } catch (error) {
        return Response.json(
            { success: false, message: 'User not found or not accepting message' },
            { status: 403 })
    }
}


