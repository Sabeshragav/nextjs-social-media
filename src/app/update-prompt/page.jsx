"use client";

import Form from "@components/Form";
import axios from "axios";
// import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function UpdatePromptPage() {
  const [submitting, setSubmitting] = useState(false);

  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  // const { data: session } = useSession();

  const router = useRouter();
  // if (!session) {
  //   router.push("/");
  // }

  const [post, setPost] = useState({
    prompt: "loading....",
    tag: "loading....",
  });

  //   useEffect(() => {
  //     console.log(post);
  //   }, [post]);

  useEffect(() => {
    const getPromptDetails = async () => {
      try {
        const response = await axios.get(`/api/prompt/${promptId}`);

        setPost(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      const response = await axios.patch(`/api/prompt/${promptId}`, post);
      if (response.status === 200) {
        toast.success("Updated");
        router.push("/profile");
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setSubmitting(false);
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
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
}
