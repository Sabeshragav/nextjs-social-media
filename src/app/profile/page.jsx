"use client";
import Profile from "@components/Profile";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const { data: session } = useSession();
  const router = useRouter();

  //for displaying other profiles
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  // console.log(userId);

  const [posts, setPosts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  // useEffect(() => {
  //   console.log(posts);
  // }, [posts]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let response;
        if (userId) {
          //other profile
          response = await axios.get(`/api/users/${userId}/prompts`);
        } else {
          //own profile
          response = await axios.get(`/api/users/${session?.user.id}/prompts`);
        }
        // console.log(response.data);
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (session?.user.id || userId) fetchPosts();
  }, [session]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    try {
      const response = await axios.delete(`/api/prompt/${post._id}`);
      if (response.status === 200) {
        toast.success("Deleted");
        setPosts((prev) => prev.filter((item) => item._id !== post._id));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setDeleteId("");
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
    <Profile
      name={userId ? `${posts?.[0]?.creator.username}'s` : "My"}
      desc={
        userId
          ? `Welcome to ${posts?.[0]?.creator.username.slice(
              0,
              11
            )}'s profile section. Explore the various posts here.`
          : "Welcome to your profile section. You can manage your posts here."
      }
      posts={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      showPopup={showPopup}
      setShowPopup={setShowPopup}
      setDeleteId={setDeleteId}
      deleteId={deleteId}
    />
  );
}
