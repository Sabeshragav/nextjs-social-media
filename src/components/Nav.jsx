"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

export default function Nav() {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const funcSetProviders = async () => {
      try {
        const response = await getProviders();
        setProviders(response);
      } catch (error) {
        console.error(error.message);
      }
    };

    funcSetProviders();
  }, []);

  // fallback
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  });

  if (!isLoaded) {
    return <div className="flex items-center justify-center">Loading ...</div>;
  }

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href={"/"} className="flex flex-center gap-2">
        <Image
          src={"/assets/images/favicon.ico"}
          alt="prompt-app"
          width={30}
          height={30}
          className="object-contain rounded-full"
        />
        <p className="logo_text">NextJS Social Media</p>
      </Link>

      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href={"/create-prompt"} className="black_btn">
              Create Post
            </Link>
            <button typ="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href={"/profile"} className="">
              <Image
                title={session?.user.name + "\n" + session?.user.email}
                src={session?.user.image || "assets/images/favicon.ico"}
                alt="profile"
                width={37}
                height={37}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile */}

      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image || "assets/images/favicon.ico"}
              alt="profile"
              width={37}
              height={37}
              className="rounded-full"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href={"/profile"}
                  className="dropdown_link"
                  onClick={() => setToggleDropdown((prev) => !prev)}
                >
                  My Profile
                </Link>
                <Link
                  href={"/create-prompt"}
                  className="dropdown_link"
                  onClick={() => setToggleDropdown((prev) => !prev)}
                >
                  Create Prompt
                </Link>
                <button
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                    rout;
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
}
