"use client";

import { useEffect, useState } from "react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { toaster } from "@/utils/toaster";
import { ButtonType, SexType } from "@/enums/enums";
import { Button, Header, TextInput } from "@/components";

// import { createDoc, getAllDocs } from "@/utils/firebaseCalls";
// import { auth } from "@/utils/firebaseConfig";
import { FamilyMember, MemberType } from "@/types/types";
import {
  UpdateFamilyMember,
  useAddFamilyMember,
  useGetAllFamilyMembers,
  useGetFamilyMember,
  useUpdateFamilyMember,
} from "@/queries/hooks/family/familyMember";

const AddNewMember = () => {
  const router = useRouter();
  const { id } = useParams();
  /** State management */
  const [member, setMember] = useState<any>();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [placeOfResidence, setPlaceOfResidence] = useState<string>("");
  const [showAsignMotherModal, setShowAsignMotherModal] =
    useState<boolean>(false);
  const [showAsignFatherModal, setShowAsignFatherModal] =
    useState<boolean>(false);
  const [mothers, setMothers] = useState<any[]>([]);
  const [fathers, setFathers] = useState<any[]>([]);
  const [motherId, setMotherId] = useState<string>("");
  const [fatherId, setFatherId] = useState<string>("");

  const [sex, setSex] = useState<string>("");

  const onSuccess = (data: any) => {
    console.log('DATA', data);
    if (data?.data != null) {
      setFirstName("");
      setEmail("");
      setLastName("");
      setPhoneNumber("");
      setPlaceOfResidence("");
      setDate("");
      setSex("");

      router.replace("home");

      toaster(` Successfully ${id ? "updated" : "created"} a family member`, "success");
    } else {
      if (data.response.data.message.includes("jwt must be provided")) {
        toaster("You don't have permission to access this route", "error");
      } else {
        toaster("Something went wrong try again later", "error");
      }
    }
  };
  const { mutate: addMember, isPending } = useAddFamilyMember(onSuccess);
  const { mutate: update, isPending: updatePending } =
    useUpdateFamilyMember(onSuccess);
  const { data, isLoading, isSuccess } = useGetAllFamilyMembers();
  const {
    data: fmember,
    isLoading: memberLoading,
    isSuccess: memberSuccess,
  } = useGetFamilyMember(id as string);

  useEffect(() => {
    if (isSuccess) {
      console.log("DATA sdasdasdfasdf: ", data);
      if (data?.data != null) {
        // setFamilyMembers(data?.data?.data);
        const fathers = data?.data?.data?.filter(
          (item: any) => item?.sex === "Male"
        );
        const mothers = data?.data?.data?.filter(
          (item: any) => item?.sex === "Female"
        );
        setFathers(fathers);
        setMothers(mothers);
      } else {
        if (data?.response?.data?.message?.includes("jwt must be provided")) {
          toaster("You don't have permission to access this route", "error");
        } else {
          toaster("Something went wrong try again later", "error");
        }
      }
    }
  }, [isSuccess, data]);

  console.log("Mothers: ", motherId);
  console.log("Fathers: ", fatherId);

  useEffect(() => {
    if (memberSuccess) {
      console.log("Single data: ", fmember);
      if (fmember?.data != null) {
        setMember(fmember?.data?.data);
        setSex(fmember?.data?.data?.sex);
        setFirstName(fmember?.data?.data?.firstName);
        setEmail(fmember?.data?.data?.email);
        setLastName(fmember?.data?.data?.lastName);
        setPhoneNumber(fmember?.data?.data?.phoneNumber);
        setPlaceOfResidence(fmember?.data?.data?.placeOfResidence);
        setDate(fmember?.data?.data?.dateOfBirth);
      } else {
        if (
          fmember?.response?.data?.message?.includes("jwt must be provided")
        ) {
          toaster("You don't have permission to access this route", "error");
        } else {
          toaster("Something went wrong try again later", "error");
        }
      }
    }
  }, [memberSuccess, fmember]);
  console.log("MEMBERS: ", member);

  const handleSex = (gender: string) => {
    gender === "Female" ? setSex("Female") : setSex("Male");
  };
  const handleSubmit = async () => {
    const newMember: FamilyMember = {
      firstName,
      lastName,
      email,
      dateOfBirth: date,
      phoneNumber,
      placeOfResidence,
      parents: [fatherId, motherId],
      sex: sex,
    };
    addMember(newMember);
    // Firebase intergration
    // try {
    //   setIsLoading(true);
    //   const members = await getAllDocs("members");
    //   for (let i of members.docs) {
    //     if (i.data()?.email === email) {
    //       setIsLoading(false);
    //       toaster(`Member with email: ${email} already exists`, "error");
    //     } else {
    //       //    Check if mother and father exists.
    //       if (i.data().parents) {
    //         for (let j of i.data().parents) {
    //           if (j.motherId === motherEmail || j.fatherId === fatherEmail) {
    //             await createDoc("members", newMember);
    //             setIsLoading(false);
    //             toaster(
    //               `Member with email: ${email} created successfully`,
    //               "success"
    //             );
    //           } else {
    //             if (j.motherId !== motherEmail) {
    //               toaster(
    //                 `A mother with this email: ${motherEmail} is not in your family tries.`,
    //                 "error"
    //               );
    //             }
    //             if (j.fatherId !== fatherEmail) {
    //               toaster(
    //                 `A mother with this email: ${fatherEmail} is not in your family tries.`,
    //                 "error"
    //               );
    //             }
    //           }
    //         }
    //       } else {
    //         await createDoc("members", newMember);
    //         setIsLoading(false);
    //         toaster(
    //           `Member with email: ${email} created successfully`,
    //           "success"
    //         );
    //       }
    //     }
    //   }

    //   console.log("Documents: ", JSON.stringify(members.docs[0].id));
    // } catch (err: any) {
    //   setIsLoading(false);
    //   toaster("Error creating memeber", "error");
    //   console.log("Error creating memeber", err);
    // }
  };

  const updateMember = async () => {
    const newMember: FamilyMember = {
      firstName,
      lastName,
      email,
      dateOfBirth: date,
      phoneNumber,
      placeOfResidence,
      parents: [fatherId, motherId],
      sex: sex,
    };
    const updateMemberData: UpdateFamilyMember = {
      member: newMember,
      id: id as string,
    };
    if (id) {
      update(updateMemberData);
    }
  };

  const saveButtonActive =
    (firstName?.length > 3 &&
      email.length > 8 &&
      phoneNumber.length > 8 &&
      placeOfResidence.length > 3) ||
    id.length > 0;
  return (
    <>
      <Header />
      <div className="relative">
        <div className="flex h-screen flex-col items-center justify-center">
          <div className="rounded-lg bg-slate-200 px-4 py-2 xs:w-[70%] sm: w-[50%] md:w-[40%] lg:w-[30%] xl:w-[25%]">
            <div>
              <p className="my-2 text-xl text-slate-600">Add member </p>
            </div>
            <div className="mt-2 [&>*]:mb-1">
              <TextInput
                label={"First name"}
                setInputValue={setFirstName}
                placeholderText={"First name"}
                disable={isPending}
                defaultValue={member?.firstName}
              />
              <TextInput
                label={"Last name"}
                setInputValue={setLastName}
                placeholderText={"Last name"}
                disable={isPending}
                defaultValue={member?.lastName}
              />
              <TextInput
                label={"Email address"}
                setInputValue={setEmail}
                placeholderText={"Enter your email address"}
                type="email"
                disable={isPending}
                defaultValue={member?.email}
              />

              <TextInput
                label={"Date"}
                setInputValue={setDate}
                placeholderText={"Date"}
                disable={isPending}
                showIcon
                type="date"
                defaultValue={member?.dateOfBirth}
              />
              <TextInput
                label={"Phone number"}
                setInputValue={setPhoneNumber}
                placeholderText={"Phone number"}
                disable={isPending}
                showIcon
                defaultValue={member?.phoneNumber}
              />
              <TextInput
                label={"Place of residence"}
                setInputValue={setPlaceOfResidence}
                placeholderText={"Place of residence"}
                disable={isPending}
                showIcon
                defaultValue={member?.placeOfResidence}
              />

              <div className="">
                <h4 className="relative max-w-max font-semibold font">
                  <span className="text-xs text-slate-600">{"Sex"}</span>
                </h4>
                <div className="flex mb-1">
                  <div onClick={() => handleSex("Female")}>
                    <h4 className="relative mb-1 max-w-max font-semibold font">
                      <span className="text-xs text-slate-600">{"Female"}</span>
                    </h4>
                    <div
                      className={`h-3.5 w-3.5 border-[1px] ${
                        sex === "Female"
                          ? "border-[var(--primary-700)] "
                          : "border-[var(--secondary-500)]"
                      } rounded-full justify-center items-center bg-white`}
                    >
                      <div
                        className={` ${
                          sex === "Female"
                            ? "bg-[var(--primary-700)] w-[7.4px] h-[7.4px] m-0.5"
                            : ""
                        }  rounded-full`}
                      />
                    </div>
                  </div>
                  <div className="ml-2" onClick={() => handleSex("Male")}>
                    <h4 className="relative mb-1 max-w-max font-semibold font">
                      <span className="text-xs text-slate-600">{"Male"}</span>
                    </h4>
                    <div
                      className={`h-3.5 w-3.5 border-[1px] ${
                        sex === "Male"
                          ? "border-[var(--primary-700)] "
                          : "border-[var(--secondary-500)]"
                      } rounded-full justify-center items-center bg-white`}
                    >
                      <div
                        className={` ${
                          sex === "Male"
                            ? "bg-[var(--primary-700)] w-[7.4px] h-[7.4px] m-0.5"
                            : ""
                        }  rounded-full`}
                      />
                    </div>
                  </div>
                </div>
                {id && member?.parents.length < 2 && (
                  <div className="flex justify-end mb-4">
                    <p
                      className="text-xs text-green-800 underline hover:cursor-pointer "
                      onClick={() => {
                        setShowAsignMotherModal(true);
                        setShowAsignFatherModal(false);
                      }}
                    >
                      Asign mother
                    </p>
                    <p
                      className="text-xs text-green-800 underline hover:cursor-pointer ml-2 "
                      onClick={() => {
                        setShowAsignMotherModal(false);
                        setShowAsignFatherModal(true);
                      }}
                    >
                      Asign father
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-1">
              <div className=" flex justify-end mt-1">
                <Button
                  btnText={"Cancel"}
                  type={ButtonType.secondary}
                  onClick={() => router.back()}
                  isActive
                />
                <div className="ml-5">
                  <Button
                    btnText={isPending ? "Creating memeber.." : updatePending ? "Updating..." : "Save"}
                    type={ButtonType.primary}
                    onClick={() => {
                      id ? updateMember() : handleSubmit();
                    }}
                    isActive={saveButtonActive || !!isPending}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showAsignMotherModal && (
        <div className="absolute right-[40%] bottom-[20%] bg-slate-600 rounded-md">
          {mothers.map((item: any, i) => (
            <div
              key={i}
              onClick={() => {
                setMotherId(item?.id);
                setShowAsignMotherModal(false);
              }}
            >
              <p className="text-xs text-slate-300 py-1 px-2 hover:cursor-pointer">
                {item?.firstName + " " + item?.lastName}
              </p>
            </div>
          ))}
        </div>
      )}
      {showAsignFatherModal && (
        <div className="absolute right-[40%] bottom-[20%] bg-slate-600 rounded-md">
          {fathers.map((item: any, i) => (
            <div
              key={i}
              onClick={() => {
                setFatherId(item?.id);
                setShowAsignFatherModal(false);
              }}
            >
              <p className="text-xs text-slate-300 py-1 px-2 hover:cursor-pointer">
                {item?.firstName + " " + item?.lastName}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
export default AddNewMember;
