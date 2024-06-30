import axios from "axios";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

// const fetchUser = async () => {
//   const session = await getSession();
//   console.log(session?.user);
//   return session?.user;
// };

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/",
  // timeout: 1000,
  // headers: { "X-USER-Header": `${fetchUser()}` },
});
