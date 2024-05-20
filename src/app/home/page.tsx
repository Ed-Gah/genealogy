"use client";
import { Header, TextInput } from "@/components";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {auth} from '../../utils/firebaseConfig';

const HomePage = () => {
  const router = useRouter();

  const [search, setSearch] = useState<string>("");


  const gotoAddMember = () => {
    router.push("/add-new-member");
  };
  return (
    <div className="px-8">
      <Header />
      <div className="pt-20 w-[90] sm:px-2 md:px-4 lg:px-10 xl:px-20 2xl:px-52">
        <TextInput
          setInputValue={setSearch}
          placeholderText="Type your name to search your genealogy"
        />
      </div>
      {search ? (
        <div>
          <p>{search}</p>
        </div>
      ) : (
        <div className=" items-center justify-center flex -mt-24 h-screen">
          <div className=" bg-[var(--primary-500)] rounded-md">
            <button
              className={"btn-primary-active w-full h-full text-3xl rounded-md"}
              onClick={() => gotoAddMember()}
            >
              {"Add new member"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
