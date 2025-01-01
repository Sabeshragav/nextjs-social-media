import Feed from "@components/Feed";
import React from "react";

export default function Home() {
  return (
    <section className="w-full flex-col flex-center">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Prompt-app is a simple demonstration of nextJs
      </p>
      <Feed />
    </section>
  );
}
