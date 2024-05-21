"use client";
import { Header, TextInput } from "@/components";

import React, { useEffect, useState } from "react";
const displayFmailyMembers = [
  "Name",
  "Sex",
  "Phone number",
  "Date of Birth",
  "Place of Residence",
  "Email",
];

const FamilyTree = () => {
  const [search, setSearch] = useState<string>("");
  // const { data, isLoading, isSuccess } = useGetAllFamilyMembers();
  // const [familyMembers, setFamilyMembers] = useState<any[]>([]);
  // useEffect(() => {
  //   if (isSuccess) {
  //     console.log("DATA sdasdasdfasdf: ", data);
  //     if (data.data != null) {
  //       setFamilyMembers(data?.dat?.data);
  //     } else {
  //       if (data?.response?.data?.message?.includes("jwt must be provided")) {
  //         toaster("You don't have permission to access this route", "error");
  //       } else {
  //         toaster("Something went wrong try again later", "error");
  //       }
  //     }
  //   }
  // }, [isSuccess, data]);

  const TextItem = (text: any) => (
    <h5 className={"text-xs font-semibold text-slate-600 px-6"}>{text}</h5>
  );
  return (
    <div className="mt-20">
      <Header />
      <div className="flex flex-col items-center justify-center">
        <div className="w-[68%]">
          <TextInput
            setInputValue={setSearch}
            placeholderText="Type your name to search your family tree"
          />
        </div>
        <div className="rounded-lg bg-slate-200 px-4 py-2">
          {search ? (
            <div>
              <p>{search}</p>
            </div>
          ) : (
            <>
              {/* {isLoading ? (
                <p className="text-xs font-semibold text-slate-600">
                  Loading your family members
                </p>
              ) : (
                <div>
                  <h4 className="text-sm text-[var(--secondary-800)] p-6">Your family members</h4>
                  <div>
                    <div className=" flex justify-between">
                      {displayFmailyMembers.map((item: string, i: number) => (
                        <div key={i} className="w-[17%]">
                          <h5
                            className={
                              "text-xs font-semibold text-slate-600 px-6"
                            }
                          >
                            {item}
                          </h5>
                        </div>
                      ))}
                    </div>
                    {familyMembers?.map((item, i: number) => (
                      <div key={i} className=" flex justify-between">
                        <div className="w-[17%]">
                          <h5
                            className={
                              "text-xs font-semibold text-[var(--secondary-800)] px-6 truncate"
                            }
                          >
                            {item?.firstName + " " + item?.lastName}
                          </h5>
                        </div>
                        <div className="w-[17%]">
                          <h5
                            className={
                              "text-xs font-semibold text-[var(--secondary-800)] px-6 truncate"
                            }
                          >
                            {item.sex}
                          </h5>
                        </div>
                        <div className="w-[17%]">
                          <h5
                            className={
                              "text-xs font-semibold text-[var(--secondary-800)] px-6 truncate"
                            }
                          >
                            {item.phoneNumber}
                          </h5>
                        </div>
                        <div className="w-[17%]">
                          <h5
                            className={
                              "text-xs font-semibold text-[var(--secondary-800)] px-6 truncate"
                            }
                          >
                            {item.dateOfBirth}
                          </h5>
                        </div>
                        <div className="w-[17%]">
                          <h5
                            className={
                              "text-xs font-semibold text-[var(--secondary-800)] px-6 truncate"
                            }
                          >
                            {item?.placeOfResidence?.toString().split("T")[0]}
                          </h5>
                        </div>
                        <div className="w-[17%]">
                          <h5
                            className={
                              "text-xs font-semibold text-[var(--secondary-800)] px-6 truncate"
                            }
                          >
                            {item.email}
                          </h5>
                        </div>
                      </div>
                    ))}
                    {familyMembers?.length === 0 && <p className="text-xs font-semibold text-slate-600 text-center mt-5">No members.</p>}
                  </div>
                </div>
              )}
              */}
              <div>
                <p className=" text-2xl text-slate-600">Comming soon!!!</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FamilyTree;
