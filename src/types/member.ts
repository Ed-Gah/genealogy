export interface MemberType {
  name: string;
  email: string;
  id: string;
  date: string;
  phoneNumber: string;
  placeOfResidence: string;
  genealogy?: Genealogy;
}
export interface Genealogy {
  name: string;
  id?: string;
  relation: string;
}
