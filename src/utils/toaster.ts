import { toast, TypeOptions } from "react-toastify";
export const toaster = (text: string, type: TypeOptions) =>
  toast(text, { position: "top-right", type });
