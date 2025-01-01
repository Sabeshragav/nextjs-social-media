"use client";

import Form from "@components/Form";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CreatePromptPage() {
  const [submitting, setSubmitting] = useState(false);

  const { data: session } = useSession();

  const router = useRouter();

  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const createPrompt = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      const updatePost = { ...post, userId: session?.user.id };
      const response = await axios.post("/api/prompt/new", updatePost);
      if (response.status === 200) {
        router.push("/");
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setSubmitting(false);
      setPost({
        prompt: "",
        tag: "",
      });
    }
  };

  // fallback
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  });

  if (!isLoaded) {
    return <div className="flex items-center justify-center">Loading ...</div>;
  }

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
}
