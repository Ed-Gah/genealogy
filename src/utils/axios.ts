import axios from "axios";
import { getToken } from "./getToken";

const client = axios.create({ baseURL: process.env.NEXT_PUBLIC_BASE_URL });
console.log('BASER URL: ',process.env.NEXT_PUBLIC_BASE_URL);

export const request = async ({ ...options }: any) => {
  const authToken = getToken();
  console.log('Auth tokesfasdfasdfasdfasdfn: ', authToken);
  const newOptions = {
    ...options,
    header: {'authorization': `Bearer ${authToken}`},
  };
  const onSuccess = (response: any) => response;
  const onError = (error: any) => {
    // optionally catch error and add attional loggin here
    return error;
  };
  return await client(newOptions).then(onSuccess).catch(onError);
};
