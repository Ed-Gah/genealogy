import { SexType } from "@/enums/enums";

export interface MemberType {
    userId: string;
    name: string;
    email: string;
    id: string;
    date: string;
    phoneNumber: string;
    placeOfResidence: string;
    parents?: Parents[];
  }
  export interface Parents {
    motherId: string;
    fatherId: string;
  }

export interface User {
    email: string;
    password: string;
    passwordConfirm?: string;
}

export interface FamilyMember {
  firstName: string;
  lastName: string;
  sex: string;
  dateOfBirth?: string;
  email?: string;
  placeOfResidence?: string;
  parents?: string[];
  phoneNumber?: string;
}

