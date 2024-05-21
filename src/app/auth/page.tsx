"use client";

import { useState } from "react";
import { QueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toaster } from "@/utils/toaster";
import { AuthType, ButtonType } from "@/enums/enums";
import { Button, TextInput } from "@/components";
// import {
//   auth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
// } from "../../utils/firebaseConfig";
import {
  useSignIn,
  useSignUp,
} from "@/queries/hooks/auth/authHook";
import { User } from "@/types/types";
import { LocalStorage } from "@/utils/storage";

export default function SignUp() {
  /** State management */
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmpassword, setconfirmPassword] = useState<string>("");
  const [viewPassword, setViewPassword] = useState<boolean>(false);
  const [inputType, setInputType] = useState<string>("password");
  const [authType, setAuthType] = useState<AuthType>(AuthType.signIn);

  const onSignUpSuccess = (data: any) => {
    console.log("DATA", data?.data);
    if (data.data != null) {
      setAuthType(AuthType.signIn);
      toaster("Your account has been created successfully", "success");
      setconfirmPassword("");
    } else {
      toaster("Something went wrong please try again", "error");
    }
  };
  const onSignInSuccess = (data: any) => {
    console.log("DATA", data?.data);
    if (data.data != null) {
      setPassword("");
      setEmail("");
      LocalStorage.set("@authToken", data?.data?.token);
      LocalStorage.set("@userEmail", data?.data?.data?.user?.email);
      console.log('User email', data?.data?.data?.user?.email)
      LocalStorage.set("@userId", data?.data?.data?.user?.id);
      router.replace("home");
      setAuthType(AuthType.signIn);
      toaster(" Successfully signed in", "success");
    } else {
      toaster("Something went wrong please try again", "error");
    }
  };
  const { mutate: signUp, isPending, isSuccess } = useSignUp(onSignUpSuccess);
  const { mutate: signIn, isPending: signInPending } =
    useSignIn(onSignInSuccess);

  /** Handle View Password function */
  const handleViewPassword = () => {
    setViewPassword((prevState) => !prevState);
    setInputType(viewPassword ? "password" : "text");
  };

  /** navigation function */
  const router = useRouter();

  const handleSignUp = async () => {
    if (password !== "") {
      if (!testPasswordRequirements(password, "length")) {
        toaster(
          "Please Password length must be at least 8 characters",
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
        // setisPending || signInPending(true);
      }
    }
    if (email === "") {
      toaster("Please Email can't be empty", "error");
    } else if (password === "") {
      toaster("Please Password can't be empty", "error");
    } else if (password != confirmpassword) {
      toaster("Password and Confirm passwatch didn't match", "error");
      console.log("Password and Confirm");
    } else {
      const user: User = {
        email,
        password,
        passwordConfirm: confirmpassword,
      };
      console.log("USER: ", JSON.stringify(user));
      signUp(user);
    }
    // Sign up with firebase
    //   try {
    //     await createUserWithEmailAndPassword(auth, email, password)
    //       .then(async (userCredential) => {
    //         const user = userCredential.user;
    //         if (user) {
    //           setAuthType(AuthType.signIn);
    //         }
    //       })
    //       .catch((error) => {
    //         toaster(`${error.message}`, "error");
    //         setisPending || signInPending(false);
    //       });
    //   } catch (error: any) {
    //     setisPending || signInPending(false);
    //     toaster(`${error.message}`, "error");
    //     throw new Error(error.message);
    //   }

    // Sign up with Node backend
  };

  const handleSignIn = async () => {
    if (email === "") {
      toaster("Please Email can't be empty", "error");
    } else if (password === "") {
      toaster("Please Password can't be empty", "error");
    }else{
      const user: User = {
        email,
        password,
      };
      console.log("USER: ", JSON.stringify(user));
      signIn(user);
    }
    // try {
      //   setisPending || signInPending(true);
    //   await signInWithEmailAndPassword(auth, email, password)
    //     .then(async (userCredential) => {
    //       const user = userCredential.user;
    //       if (user) {
    //         router.replace("home");
    //       }
    //       //   setisPending || signInPending(false);
    //     })
    //     .catch((error) => {
    //       if (error.message.includes("not-found")) {
    //         toaster(
    //           `Sorry! the email:${email} doesn't exist in our system.`,
    //           "error"
    //         );
    //       } else if (error.message.includes("wrong-password")) {
    //         toaster(`Check you password and try again`, "error");
    //       } else {
    //         toaster(`${error.message}`, "error");
    //       }
    //       console.log("Error:", error);
    //       //   setisPending || signInPending(false);
    //     });
    // } catch (error: any) {
    //   toaster(`${error.message}`, "error");
    //   //   setisPending || signInPending(false);
    //   throw new Error(error.message);
    // }
  };

  //   const { mutate: addUser } = useAddUser(onSucess) as any;

  /** Test password requirement */
  function testPasswordRequirements(input: string, testCase: string) {
    switch (testCase) {
      case "length":
        return input.length > 7;
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
      <div className="flex flex-col items-center justify-center">
        <div className="rounded-lg bg-slate-200 px-4 py-2 w-[50%]">
          <h3 className="text-lg text-slate-600 font-medium mb-2">
            Genealogy App, your family history tool that makes it easy for you
            to discover and save important details about your{" "}
            <span className="text-[var(--primary-700)]">Family Tree.</span>
          </h3>
          <div>
            <h4 className="text-md text-[var(--primary-700)]">
              {authType === AuthType.signUp ? "Create  Account" : "Sign In"}
            </h4>
            <p className="my-2 text-xs text-slate-600">
              {authType === AuthType.signUp
                ? "Fill in the necessary fields to to create your account"
                : "Enter your email and password to sign in"}
            </p>
          </div>
          <div className="mt-2 [&>*]:mb-2">
            <TextInput
              label={"Email address"}
              setInputValue={setEmail}
              placeholderText={"Enter your email address"}
              type="email"
              disable={isPending || signInPending}
            />

            <TextInput
              label={"Password"}
              setInputValue={setPassword}
              placeholderText={"Password"}
              type={inputType}
              disable={isPending || signInPending}
              showIcon
            />
            {authType == AuthType.signUp && (
              <TextInput
                label={"Confirm password"}
                setInputValue={setconfirmPassword}
                placeholderText={"Password"}
                type={inputType}
                disable={isPending || signInPending}
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
                    8 characters minimum
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
                btnText={
                  authType === AuthType.signUp
                    ? isPending || signInPending
                      ? "Creating account..."
                      : "Sign Up"
                    : isPending || signInPending
                    ? "Signing in ..."
                    : "Sign In"
                }
                type={ButtonType.primary}
                onClick={() =>
                  authType === AuthType.signUp ? handleSignUp() : handleSignIn()
                }
                isActive={
                  (email.length > 8 && password.length > 7) ||( !isPending || !signInPending)
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
