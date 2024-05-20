"use client";

import { useState } from "react";
import { QueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toaster } from "@/utils/toaster";
import { AuthType, ButtonType } from "@/enums/enums";
import { Button, TextInput } from "@/components";
import { log } from "console";

export default function SignUp() {
  /** State management */
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmpassword, setconfirmPassword] = useState<string>("");
  const [viewPassword, setViewPassword] = useState<boolean>(false);
  const [inputType, setInputType] = useState<string>("password");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [authType, setAuthType] = useState<AuthType>(AuthType.signUp);

  /** Handle View Password function */
  const handleViewPassword = () => {
    setViewPassword((prevState) => !prevState);
    setInputType(viewPassword ? "password" : "text");
  };

  /** navigation function */
  const router = useRouter();

  const handleSignUp = async () => {
    console.log("Signup");
    if (email === "") {
      toaster("Please Email can't be empty", "error");
    } else if (password === "") {
      toaster("Please Password can't be empty", "error");
    } else if (password !== "") {
      if (!testPasswordRequirements(password, "length")) {
        toaster(
          "Please Password length must be at least 6 characters",
          "error"
        );
      } else if (!testPasswordRequirements(password, "number")) {
        toaster("Please Password must contain a number", "error");
      } else if (!testPasswordRequirements(password, "uppercaseLowercase")) {
        toaster(
          "Please Password must contain a lowercase letter and an Uppercase letter",
          "error"
        );
      } else {
        setIsLoading(true);
      }
    }
    try {
      //   await createUserWithEmailAndPassword(auth, email, password)
      //     .then(async (userCredential) => {
      //       const user = userCredential.user;
      //       await updateProfile(user, { displayName: name });
      //       /** Setting user object for request */
      //       const userObject = {
      //         user_name: name,
      //         email,
      //       };
      //       user && addUser(userObject);
      //     })
      //     .catch((error) => {
      //       toaster(`${error.message}`, "error");
      //       setIsLoading(false);
      //     });
    } catch (error: any) {
      toaster(`${error.message}`, "error");
      throw new Error(error.message);
    }
  };

  /** Adding the user to the Application database */
  const queryClient = new QueryClient();
  const onSucess = (data: any) => {
    setIsLoading(false);
    // let error = handleErrorMessage(data);
    // if (error?.msg) {
    //   toaster(error.msg, "error");
    // } else {
    //   toaster("Account Created successfully", "success");
    //   setName("");
    //   setEmail("");
    //   setPassword("");
    router.replace("home");
    // }
    // setShow(false);
    // queryClient.invalidateQueries(["materials"]);
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
    <div className="relative">
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="rounded-lg bg-slate-200 px-14 py-11">
          <div>
            <h1 className="text-3xl font-semibold">Create Account</h1>
            <p className="my-2 text-xs text-slate-600">
              Fill in the necessary information fields to to create your account
            </p>
          </div>
          <div className="mt-6 [&>*]:mb-6">
            <TextInput
              label={"Email address"}
              setInputValue={setEmail}
              placeholderText={"Enter your email address"}
              type="email"
              disable={isLoading}
            />

            <TextInput
              label={"Password"}
              setInputValue={setPassword}
              placeholderText={"Password"}
              type={inputType}
              disable={isLoading}
              showIcon
            />
            {authType == AuthType.signUp && (
              <TextInput
                label={"Confirm password"}
                setInputValue={setPassword}
                placeholderText={"Password"}
                type={inputType}
                disable={isLoading}
                showIcon
              />
            )}

            {authType == AuthType.signUp && (
              <div className="flex items-center justify-between pl-5 text-xs">
                <ul className="list-disc text-xs text-slate-600 [&>*]:mb-1.5">
                  <li
                    className={`${
                      testPasswordRequirements(password, "length") &&
                      "text-green-500"
                    }`}
                  >
                    6 characters minimum
                  </li>
                  <li
                    className={`${
                      testPasswordRequirements(password, "number") &&
                      "text-green-500"
                    }`}
                  >
                    At least one number
                  </li>
                  <li
                    className={`${
                      testPasswordRequirements(
                        password,
                        "uppercaseLowercase"
                      ) && "text-green-500"
                    }`}
                  >
                    Upper & lowercase character
                  </li>
                </ul>
              </div>
            )}

            <div>
              <Button
                btnText={authType === AuthType.signUp ? "Sign Up" : "Sign In"}
                type={ButtonType.primary}
                onClick={() =>
                  authType === AuthType.signUp ? handleSignUp() : handleSignIn()
                }
                isActive={
                  !(
                    email.length != 0 &&
                    password.length != 0 &&
                    confirmpassword.length != 0
                  )
                }
              />

              <p className="mt-4 text-center text-xs inline-flex">
                {authType === AuthType.signUp
                  ? "Already have an account ?"
                  : "Don't have an account ?"}
                <p onClick={handleSwitchAuth}>
                  <span className="ml-1 text-[var(--secondary-800)] hover:underline">
                    {authType === AuthType.signUp ? "Sign in" : "Sign Up"}
                  </span>
                </p>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
