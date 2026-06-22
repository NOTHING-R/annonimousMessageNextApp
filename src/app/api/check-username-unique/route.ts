import dbConnect from "@/lib/dbConnection";
import UserModel from "@/models/User.model";
import { success, z } from 'zod'
import { userNameValidation } from "@/schemas/singUpSchema";

const usernameQuerySchema = z.object({
  username: userNameValidation
})

export async function GET(request: Request) {

  await dbConnect()

  try {
    const { searchParams } = new URL(request.url)
    const queryParam = {
      username: searchParams.get("username")
    }
    //validate with zod
    const result = usernameQuerySchema.safeParse(queryParam)
    console.log(request) //TODO: remove this
    if(!result.success) { 
      const usernameErrors = result.error.format().username?._errors || []

      return Response.json({success: false},{status: 500}) 
    }

  } catch (error) {
    console.error("Error checking username", error)
    return Response.json({ success: false, message: "Error checking username" }, { status: 500 })

  }
}


