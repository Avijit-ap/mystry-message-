import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { authOptions } from "../auth/[...nextauth]/options";
import { User, getServerSession } from 'next-auth';


export async function POST(request:Request) {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const user: User = session?.user;
    if (!session || !session.user) {
        return Response.json(
          { success: false, message: 'Not authenticated' },
          { status: 401 }
        );
      }

      const userId = user._id;
      const { acceptMessages } = await request.json();
try {
   const updatedUser= await UserModel.findByIdAndUpdate(
        userId,
        { isAcceptingMessages: acceptMessages },
        { new: true }
      );
      if (!updatedUser) {
        // User not found
        return Response.json(
          {
            success: false,
            message: 'Unable to find user to update message acceptance status',
          },
          { status: 404 }
        );
      }
      return Response.json(
        {
          success: true,
          message: 'Message acceptance status updated successfully',
          updatedUser,
        },
        { status: 200 }
      );

} catch  (error) {
    console.error('Error updating message acceptance status:', error);
    return Response.json(
      { success: false, message: 'Error updating message acceptance status' },
      { status: 500 }
    );
  }
}


export async function GET() {
   await dbConnect();
   // Get the user session
  const session = await getServerSession(authOptions);
  const user = session?.user;
    try {
        const foundUser = await UserModel.findById(user._id);
        if (!foundUser) {
            // User not found
            return Response.json(
              { success: false, message: 'User not found' },
              { status: 404 }
            );
          }
          return Response.json(
            {
              success: true,
              isAcceptingMessages: foundUser.isAcceptingMessage,
            },
            { status: 200 }
          );
    } catch (error) {
        console.error("Something went wrong", error);
        return Response.json(
          { success: false, message: 'Something went wrong' },
          { status: 500 }
        )
    }
}
