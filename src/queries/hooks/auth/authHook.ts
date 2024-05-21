import { User } from "@/types/types";
import { request } from "../../../utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const signUp = (user: User) => {
  return request({ url: "/auth/signup", method: "post", data: user });
};
const signIn = (user: User) => request({ url: "/auth/login", method: "post", data: user })

export const useSignUp = (onSuccess: any) => {
  return useMutation({mutationFn: signUp,  onSuccess });
};

export const useSignIn = (onSuccess: any) => useMutation({mutationFn: signIn,  onSuccess });
