import promptModel from "@models/promptModel";
import connectMongo from "@utils/connectDB";

export async function GET(req, { params }) {
  try {
    await connectMongo();

    const promptData = await promptModel
      .find({ creator: params.userId })
      .populate("creator");

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
