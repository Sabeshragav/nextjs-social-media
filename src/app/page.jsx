import Feed from "@components/Feed";
import React from "react";

export default function Home() {
  return (
    <section className="w-full flex-col flex-center">
      <h1 className="head_text text-center">
        Connect & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">Inspiring Posts</span>
      </h1>
      <p className="desc text-center">
        Join the community and express yourself through engaging content.
      </p>
      <Feed />
    </section>
  );
}
