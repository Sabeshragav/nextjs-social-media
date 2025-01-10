import promptModel from "@models/promptModel";
import connectMongo from "@utils/connectDB";

export async function POST(req) {
  try {
    await connectMongo();

    const { userId, prompt, tag } = await req.json();

    await promptModel.create({ creator: userId, prompt, tag });

    return new Response(null, {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Failed to create prompt" }),
      {
        status: 500,
      }
    );
  }
}
