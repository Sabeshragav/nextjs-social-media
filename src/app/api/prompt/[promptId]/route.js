import promptModel from "@models/promptModel";
import connectMongo from "@utils/connectDB";

//GET
export async function GET(req, { params }) {
  try {
    const { promptId } = await params;

    await connectMongo();

    const singlePrompt = await promptModel
      .findById(promptId)
      .populate("creator");

    if (!singlePrompt)
      return new Response("No prompt found", {
        status: 404,
      });

    return new Response(
      JSON.stringify(singlePrompt, {
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

//PATCH
export async function PATCH(req, { params }) {
  try {
    const { prompt, tag } = await req.json();

    await connectMongo();

    const existingPrompt = await promptModel.findById(params.promptId);

    if (!existingPrompt)
      return new Response("No prompt found", {
        status: 404,
      });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(
      JSON.stringify(existingPrompt, {
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

//DELETE
export async function DELETE(req, { params }) {
  try {
    await connectMongo();

    const existingPrompt = await promptModel.findById(params.promptId);

    if (existingPrompt) {
      await promptModel.findByIdAndDelete(params.promptId);

      return new Response("Prompt deleted", {
        status: 200,
      });
    }

    return new Response("No prompt found", {
      status: 404,
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify(error.message, {
        status: 500,
      })
    );
  }
}
