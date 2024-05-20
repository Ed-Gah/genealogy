"use client"
import { Header, TextInput } from "@/components";
import React, { useState } from "react";

const FamilyTree = () => {
  const [search, setSearch] = useState<string>("");
  return (
    <div className="mt-20">
      <Header />
      <div className=" w-[90] sm:px-2 md:px-4 lg:px-10 xl:px-20 2xl:px-52">
        <TextInput
          setInputValue={setSearch}
          placeholderText="Type your name to search your family tree"
        />
      </div>
      {search ? (
        <div>
          <p>{search}</p>
        </div>
      ) : (
        <div> FamilyTree</div>
      )}
    </div>
  );
};

export default FamilyTree;
