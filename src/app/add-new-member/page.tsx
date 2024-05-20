"use client";

import { useState } from "react";
import { QueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toaster } from "@/utils/toaster";
import { AuthType, ButtonType } from "@/enums/enums";
import { Button, Header, TextInput } from "@/components";

const AddNewMember = () => {
  /** State management */
  const [name, setName] = useState<string>("");
  const [relatedTo, setRelatedTo] = useState<string>("");
  const [relatedToName, setRelatedToName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [confirmpassword, setconfirmPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [placeOfResidence, setPlaceOfResidence] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [authType, setAuthType] = useState<AuthType>(AuthType.signUp);

  /** navigation function */
  const router = useRouter();

  const handleSignUp = async () => {
    console.log("Signup");
    if (email === "") {
      toaster("Please Email can't be empty", "error");
    } else if (email === "") {
      toaster("Please Password can't be empty", "error");
    } else if (email !== "") {
      if (!testPasswordRequirements(email, "length")) {
        toaster(
          "Please Password length must be at least 6 characters",
          "error"
        );
      } else if (!testPasswordRequirements(email, "number")) {
        toaster("Please Password must contain a number", "error");
      } else if (!testPasswordRequirements(email, "uppercaseLowercase")) {
        toaster(
          "Please Password must contain a lowercase letter and an Uppercase letter",
          "error"
        );
      } else {
        setIsLoading(true);
      }
    }
  };

  const handleSignIn = () => {
    router.replace("home");
    console.log("Signing in...");
  };

  //   const { mutate: addUser } = useAddUser(onSucess) as any;

  /** Test password requirement */
  function testPasswordRequirements(input: string, testCase: string) {
    switch (testCase) {
      case "length":
        return input.length > 5;
      case "number":
        return /\d/.test(input);
      case "uppercaseLowercase":
        return /[a-z]/.test(input) && /[A-Z]/.test(input);
      default:
        return false;
    }
  }
  const handleSwitchAuth = () => {
    authType === AuthType.signUp
      ? setAuthType(AuthType.signIn)
      : setAuthType(AuthType.signUp);
  };
  return (
    <>
    <Header />
    <div className="relative">
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="rounded-lg bg-slate-200 px-14 py-11">
          <div>
            <p className="my-2 text-xs text-slate-600">Add family member </p>
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
              setInputValue={date}
              placeholderText={"Date"}
              disable={isLoading}
              showIcon
              type="date"
            />
            {authType == AuthType.signUp && (
              <TextInput
                label={"Place of residence"}
                setInputValue={setPlaceOfResidence}
                placeholderText={"Place of residence"}
                disable={isLoading}
                showIcon
              />
            )}

            <div>
              <h4 className="relative mb-1 ml-2 max-w-max font-semibold font">
                <span>{"Genealogy"}</span>
              </h4>
              <div className="flex ">
                <TextInput
                  setInputValue={setRelatedTo}
                  placeholderText={"Relation"}
                  disable={isLoading}
                />
                <TextInput
                  setInputValue={setRelatedToName}
                  placeholderText={"Relation name"}
                  disable={isLoading}
                />
              </div>
            </div>
          </div>
          <div>
            <div className=" flex justify-end">
              <Button
                btnText={"Cancel"}
                type={ButtonType.secondary}
                onClick={() =>
                 router.back()
                }
                isActive
              />
              <div className="ml-5">
              <Button
                btnText={"Save"}
                type={ButtonType.primary}
                onClick={() =>
                  authType === AuthType.signUp ? handleSignUp() : handleSignIn()
                }
                isActive={true}
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
