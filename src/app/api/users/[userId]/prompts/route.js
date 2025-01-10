import promptModel from "@models/promptModel";
import connectMongo from "@utils/connectDB";

export async function GET(req, { params }) {
  try {
    const { userId } = await params;

    await connectMongo();

    const promptData = await promptModel
      .find({ creator: userId })
      .populate("creator");
    // console.log(promptData);

    return new Response(
      JSON.stringify(promptData, {
        status: 200,
      })
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify(error.message, {
        status: 500,
      })
    );
  }
}
