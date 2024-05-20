"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Props {
  isHomePage?: boolean;
}

export default function HeaderClient({ isHomePage }: Props) {
  /** State management */
  const [viewProfile, setViewProfile] = useState<boolean>(false);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const profileRef = useRef<any>();
  const mobileMenuRef = useRef<any>();

  /** Router for navigation */
  const router = useRouter();

  /** Show menu */
  const [showMenu, setShowMenu] = useState<boolean>(false);

  useEffect(() => {
    const handler = (event: any) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setViewProfile(false);
      }
    };

    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  }, []);

  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-[var(--secondary-100)] py-2.5 sm:px-2 md:px-4 lg:px-10 xl:px-20 2xl:px-52 ">
      <div className="mx-auto flex w-[90%] items-center justify-between">
        <div className={`flex items-center ${isHomePage && "gap-[10rem]"}`}>
          {/* Logo */}
          <div
            className="ml-4 mr-8 flex h-12 w-40 cursor-pointer items-center rounded-lg px-5 py-2"
            onClick={() => router.push("home")}
          >
            <p className=" text-4xl font-bold text-[var(--secondary-800)]">GNLY</p>
          </div>
          {/* Welcome message */}

          {isAuth && isHomePage && (
            <div>
              <p className="font-bold">Welcome Emmanuel</p>
            </div>
          )}

          {/* Seached component */}
        </div>

        <div className="flex items-center gap-5 [&>*]:flex [&>*]:cursor-pointer [&>*]:items-center [&>*]:gap-2">
          <ul>
            {[{name: "Family tree", href: '/family-tree'}, {name: "Add member", href: '/add-new-member'}].map((item, i) => (
              <li key={i}>
                <Link href={item.href}  className="text-[var(--secondary-800)]">{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
