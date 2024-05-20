"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth } from "@/utils/firebaseConfig";

interface Props {
  email?: string;
}

export default function HeaderClient({ email }: Props) {
  const currentUser = auth?.currentUser;

  /** Router for navigation */
  const router = useRouter();

  /** Show menu */
  const [activeTap, setActiveTap] = useState<string>("Home");
  console.log("Active tap: " + activeTap);

  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-[var(--secondary-100)] py-2.5 sm:px-2 md:px-4 lg:px-10 xl:px-20 2xl:px-52 ">
      <div className="mx-auto flex w-[90%] items-center justify-between">
        <div className={`flex items-center`}>
          {/* Logo */}
          <div
            className="flex h-12 mr-3 cursor-pointer items-center rounded-lg py-2"
            onClick={() => router.push("home")}
          >
            <p className=" text-4xl font-bold text-[var(--secondary-800)]">
              GNLY
            </p>
          </div>
          {/* Welcome message */}

          {currentUser?.email && (
            <div>
              <p className=" font-normal">
                Welcome!{" "}
                <span className="text-[var(--secondary-800)]">
                  {currentUser?.email}
                </span>
              </p>
            </div>
          )}

          {/* Seached component */}
        </div>

        <div className="flex items-center gap-5 [&>*]:flex [&>*]:cursor-pointer [&>*]:items-center [&>*]:gap-5">
          <ul>
            {[
              { name: "Home", href: "/home" },
              { name: "Family tree", href: "/family-tree" },
              { name: "Add member", href: "/add-new-member" },
            ].map((item, i) => (
              <li
                key={i}
                className={`${
                  activeTap === item.name &&
                  "bg-[var(--secondary-700)] px-2 pb-1 rounded-sm"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTap(item.name);
                }}
              >
                <Link href={item.href} className="text-[var(--secondary-800)]">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
