"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { getToken, getUserEmail } from "@/utils/getToken";
// import { auth } from "@/utils/firebaseConfig";

export default function HeaderClient() {
  const email = getUserEmail();
  const authToken = getToken();
  console.log("Email: " + email);

  /** Router for navigation */
  const router = useRouter();
  const path = usePathname();

  /** Show menu */
  const handleTap = (e: any, item: any) => {
    if (authToken) {
      e.preventDefault();
      router.replace(item.href);
    } else {
      router.replace("/sign-up");
    }
  };
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

          {email && (
            <div>
              <p className=" font-normal">
                Welcome!{" "}
                <span className="text-[var(--secondary-800)]">{email}</span>
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
                  path === item.href &&
                  " border-b-4  border-[var(--primary-700)] px-2 pb-1 rounded-sm"
                }`}
              >
                <Link
                  onClick={(e) => handleTap(e, item)}
                  href={item.href}
                  className="text-[var(--secondary-800)]"
                >
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
