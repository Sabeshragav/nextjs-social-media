"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function PromptCard({
  post,
  handleTagClick,
  showPopup,
  setShowPopup,
  handleEdit,
  handleDelete,
  deleteId,
  setDeleteId,
}) {
  // console.log(post);

  const { data: session } = useSession();
  const pathName = usePathname();

  const [copied, setCopied] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText(post.prompt);
    setCopied(post.prompt);
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <Link
          href={
            session?.user.id === post.creator._id
              ? `/profile`
              : `/profile?id=${post.creator._id}`
          }
          className="flex-1 flex justify-start items-center gap-3"
        >
          <Image
            src={post.creator.image || "assets/images/favicon.ico"}
            alt="User Image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="text-gray-900 font-satoshi font-semibold">
              {post.creator.username}
            </h3>
            <p className="text-gray-500 font-inter text-sm">
              {post.creator.email}
            </p>
          </div>
        </Link>

        <div className="copy_btn" onClick={() => post.prompt && handleCopy()}>
          <Image
            src={
              copied === post.prompt
                ? "assets/icons/tick.svg"
                : "assets/icons/copy.svg"
            }
            alt="copy button"
            width={12}
            height={12}
            className="rounded-full object-contain"
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-gray-700 text-sm">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick(post.tag)}
      >
        {post.tag}
      </p>

      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <>
          <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
            <p
              className="font-inter text-sm green_gradient cursor-pointer"
              onClick={handleEdit}
            >
              Edit
            </p>
            <p
              className="font-inter text-sm orange_gradient cursor-pointer"
              onClick={() => {
                setShowPopup(true);
                setDeleteId(post._id);
              }}
            >
              Delete
            </p>
          </div>

          {showPopup && deleteId === post._id && (
            <>
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="inset-0 rounded-lg px-4 w-full h-full flex flex-col items-center justify-center bg-white opacity-80 text-center backdrop-blur-3xl">
                  <h2 className="text-lg font-semibold mb-4">
                    Are you sure you want to delete this post?
                  </h2>
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={handleDelete}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => {
                        setShowPopup(false);
                        setDeleteId("");
                      }}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
