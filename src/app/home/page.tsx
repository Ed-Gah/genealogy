"use client";
import { Header, TextInput } from "@/components";
import React, { useEffect, useState } from "react";
import {
  useGetAllFamilyMembers,
  useGetFamilyMember,
} from "@/queries/hooks/family/familyMember";
import { toaster } from "@/utils/toaster";
import { useRouter } from "next/navigation";

const displayFmailyMembers = [
  "Name",
  "Sex",
  "Phone number",
  "Date of Birth",
  "Place of Residence",
  "Email",
];

const HomePage = () => {
  const { data, isLoading, isSuccess } = useGetAllFamilyMembers();
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [active, setActive] = useState<number | null>();
  const [familyMembers, setFamilyMembers] = useState<any[]>([]);
  const [isHovering, setIsHovered] = useState(false);
  const onMouseEnter = (val: number) => {
    setIsHovered(true);
    setActive(val);
  };
  const onMouseLeave = () => {
    setIsHovered(false);
    setActive(null);
  };
  useEffect(() => {
    if (isSuccess) {
      if (data.data != null) {
        setFamilyMembers(data?.data?.data);
      } else {
        if (data?.response?.data?.message?.includes("jwt must be provided")) {
          toaster("You don't have permission to access this route", "error");
        }
         else {
          toaster("Something went wrong try again later", "error");
        }
      }
    }
  }, [isSuccess, data]);

  const gotoAddMember = () => {
    router.push("/add-new-member");
  };
  return (
    <div className="mt-20">
      <Header />
      <div className="flex flex-col items-center justify-center">
        <div className="rounded-lg bg-slate-200 px-4 py-2">
          <TextInput
            setInputValue={setSearch}
            placeholderText="Type your name to search your family tree"
          />
          {search ? (
            <div>
              <p>{search}</p>
            </div>
          ) : (
            <>
              {isLoading ? (
                <p className="text-xs font-semibold text-slate-600">
                  Loading members
                </p>
              ) : (
                <div>
                  <h4 className="text-sm text-[var(--secondary-800)] p-6">
                    Available members
                  </h4>
                  <div>
                    <div className=" flex justify-between">
                      {displayFmailyMembers.map((item: string, i: number) => (
                        <>
                          <div key={i} className="w-[17%]">
                            <h5
                              className={
                                "text-xs font-semibold text-slate-600 px-6"
                              }
                            >
                              {item}
                            </h5>
                          </div>
                        </>
                      ))}
                    </div>
                    {familyMembers?.map((item, i: number) => (
                      <>
                        {isHovering &&
                          active === i &&
                          item?.parents.length === 0 && (
                            <div className=" relative right-8 flex mt-2 float-end">
                              <p className="text-xs text-green-800 underline ">
                                Assign mother
                              </p>
                              <p className="text-xs text-green-800 ml-2 underline">
                                Assign father
                              </p>
                            </div>
                          )}
                        <div
                          key={i}
                          className=" flex justify-between mt-2 hover:cursor-pointer hover:bg-slate-300 hover:py-1"
                          onClick={() => {
                            router.push(`/${item?.id}`);
                            console.log("IDIDID: ", item?.id);
                          }}
                          onMouseEnter={() => onMouseEnter(i)}
                          onMouseLeave={onMouseLeave}
                        >
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
                      </>
                    ))}
                    {familyMembers.length === 0 && (
                      <p className="text-xs font-semibold text-slate-600 text-center mt-5">
                        No members.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        {!isLoading && (
          <div className=" bg-[var(--primary-500)] rounded-md mt-3">
            <button
              className={"btn-primary-active w-full h-full text-3xl rounded-md"}
              onClick={() => gotoAddMember()}
            >
              {"Add new member"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
