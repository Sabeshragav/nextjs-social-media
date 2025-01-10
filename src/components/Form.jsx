import Link from "next/link";
import React from "react";

export default function Form({
  type,
  post,
  setPost,
  submitting,
  handleSubmit,
}) {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} your creativity and share your amazing posts across the network!
        Whether it's a thought, a story, or a vision, make it shine and inspire
        others!
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full flex flex-col gap-7 glassmorphism max-w-2xl"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your Title
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your prompt here..."
            required
            className="form_textarea"
          ></textarea>
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag <span className="font-normal">(#product, #nextjs, #web)</span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tag"
            required
            className="form_input"
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href={"/"} className="text-gray-500 text-sm hover:underline">
            Cancel
          </Link>

          {submitting ? (
            <div className="text-sm black_btn_disabled">Submitting</div>
          ) : (
            <button type="submit" className="text-sm black_btn">
              {type}
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
