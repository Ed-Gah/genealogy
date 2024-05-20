"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toaster } from "@/utils/toaster";
import { AuthType, ButtonType } from "@/enums/enums";
import { Button, Header, TextInput } from "@/components";
import { MemberType } from "@/types/member";
import {
  db,
  addDoc,
  collection,
  getDoc,
  getDocs,
  doc,
  DocumentReference,
} from "@/utils/firebaseConfig";
import { createDoc, getAllDocs } from "@/utils/firebaseCalls";

const AddNewMember = () => {
  /** State management */
  const [name, setName] = useState<string>("");
  const [relation, setRelation] = useState<string>("");
  const [relationName, setRelatioonName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [placeOfResidence, setPlaceOfResidence] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /** navigation function */
  const router = useRouter();

  const handleSubmit = async () => {
    const newMember: MemberType = {
      name,
      email,
      date,
      phoneNumber,
      placeOfResidence,
      id: email,
      genealogy: { name: relationName, relation: relation },
    };
    try {
      setIsLoading(true);
      const members = await getAllDocs("members");
      for (let i of members.docs) {
        if (i.data()?.email === email) {
            setIsLoading(false);
            toaster(
                `Member with email: ${email} already exists`,
                "error"
              );
        } else {
          await createDoc("member", newMember);
          setIsLoading(false);
          toaster(
            `Member with email: ${email} created successfully`,
            "success"
          );
        }
      }

      console.log("Documents: ", JSON.stringify(members.docs[0].id));
    } catch (err: any) {
      setIsLoading(false);
      toaster("Error creating memeber", "error");
      console.log("Error creating memeber", err);
    }
    console.log("New Member: " + JSON.stringify(newMember));
  };

  const saveButtonActive = 
  name.length > 3 &&
    email.length > 8 &&
    phoneNumber.length > 8 &&
    placeOfResidence.length > 3 &&
    date.toString().length > 6;

  return (
    <>
      <Header />
      <div className="relative">
        <div className="flex h-screen flex-col items-center justify-center">
          <div className="rounded-lg bg-slate-200 px-14 py-11">
            <div>
              <p className="my-2 text-2xl text-slate-600">Add family member </p>
            </div>
            <div className="mt-6 [&>*]:mb-6">
              <TextInput
                label={"Name"}
                setInputValue={setName}
                placeholderText={"Name"}
                disable={isLoading}
              />
              <TextInput
                label={"Email address"}
                setInputValue={setEmail}
                placeholderText={"Enter your email address"}
                type="email"
                disable={isLoading}
              />

              <TextInput
                label={"Date"}
                setInputValue={setDate}
                placeholderText={"Date"}
                disable={isLoading}
                showIcon
                type="date"
              />
              <TextInput
                label={"Phone number"}
                setInputValue={setPhoneNumber}
                placeholderText={"Phone number"}
                disable={isLoading}
                showIcon
              />
              <TextInput
                label={"Place of residence"}
                setInputValue={setPlaceOfResidence}
                placeholderText={"Place of residence"}
                disable={isLoading}
                showIcon
              />

              <div>
                <h4 className="relative mb-1 ml-2 max-w-max font-semibold font">
                  <span className="text-xs text-slate-600">{"Genealogy"}</span>
                </h4>
                <div className="flex ">
                  <TextInput
                    setInputValue={setRelation}
                    placeholderText={"E.g, father"}
                    disable={isLoading}
                  />
                  <div className="ml-2">
                    <TextInput
                      setInputValue={setRelatioonName}
                      placeholderText={"E.g father's name"}
                      disable={isLoading}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className=" flex justify-end">
                <Button
                  btnText={"Cancel"}
                  type={ButtonType.secondary}
                  onClick={() => router.back()}
                  isActive
                />
                <div className="ml-5">
                  <Button
                    btnText={isLoading ? "Creating memeber.." : "Save"}
                    type={ButtonType.primary}
                    onClick={() => handleSubmit()}
                    isActive={saveButtonActive || !!isLoading}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddNewMember;
