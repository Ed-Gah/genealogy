import { FamilyMember, User } from "@/types/types";
import { request } from "../../../utils/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { headers } from "next/headers";
import { getToken } from "@/utils/getToken";

interface UpdateFamilyMember {
    member: FamilyMember;
    id: string;
}
const authToken = getToken();
console.log('Auth tokenddtdttrtrddtrtdtddtrddtdrtdtrd: ', authToken);
const headers =  {'authorization': `Bearer ${authToken}`};

const addFamilyMember = (member: FamilyMember) => {
  return request({ url: "", method: "post", data: member, headers});
};
const updateFamilyMember = (member: UpdateFamilyMember) => request({ url: `${member.id}`, method: "post", data: member.member })

export const useAddFamilyMember = (onSuccess: any) => {
  return useMutation({mutationFn: addFamilyMember,  onSuccess });
};

export const useUpdateFamilyMember = (onSuccess: any) => useMutation({mutationFn: updateFamilyMember,  onSuccess });

const getAllFamilyMembers = ()=> request({ url: "", headers});
export const useGetAllFamilyMembers = () =>{
    return useQuery({queryKey:['familyMembers'], queryFn: () => getAllFamilyMembers()});
}

const getFamilyMember = (id: string) => request({ url:`${id}`, headers});
export const useGetFamilyMember = (id:string) =>{
    return useQuery({queryKey:['familyMember'], queryFn: () => getFamilyMember(id)});
}

const getSiblings = (id: string) => request({ url:`/siblings/${id}`, headers});
export const useGetSiblings = (id:string) =>{
    return useQuery({queryKey:['siblings'], queryFn: () => getSiblings(id)});
}

const getChildren = (id: string) => request({ url:`/children/${id}`,});
export const useGetChildren = (id:string) =>{
    return useQuery({queryKey:['children'], queryFn: () => getChildren(id)});
}