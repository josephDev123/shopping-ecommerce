import axios from "axios";
import { getServerSession } from "next-auth";

// const fetchUser = async () => {
//   const user = await getServerSession();
//   return user;
// };

export const axiosInstance = axios.create({
  baseURL: "https://localhost/api/",
  timeout: 1000,
  // headers: { "X-USER-Header": `${fetchUser()}` },
});
