import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "../../../lib/dbConnection";
import UserModel from "@/models/User.model";
import { User } from 'next-auth'
import { success } from "zod";

export async function POST(request: Request) {

  await dbConnect()

  const session = await getServerSession(authOptions)

  const user: User = session?.user as User

  if (!session || session.user) {
    return Response.json(
      { success: false, message: 'User not authenticated' },
      { status: 400 }
    )
  }
  const userId = user?._id
  const { acceptMessage } = await request.json()

  try {
    const updateUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptingMessage: acceptMessage },
      { new: true },
    )
    if (!updateUser) {
      return Response.json(
        { success: false, message: "failed to update user ststus to accept message " },
        { status: 500 }
      )
    }

    return Response.json(
      { success: true, message: "User status updated successfully for accepting message " },
      { status: 500 }
    )
  } catch (error) {
    console.error("failed to update user ststus to accept message ")
    return Response.json(
      { success: false, message: "failed to update user ststus to accept message " },
      { status: 500 }
    )
  }
}

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
  const userId = user?._id
  try {

    const foundUser = await UserModel.findById(userId)

    if (!foundUser) {
      return Response.json(
        { success: false, message: "Couldn't found user" },
        { status: 500 }
      )
    }
    return Response.json(
      { success: false, message: "User found successfully and ready to send message " },
      { status: 200 }
    )
  } catch (error) {

    console.error("failed to find user ")
    return Response.json(
      { success: false, message: "failed to update user ststus to accept message " },
      { status: 500 }
    )
  }

}
