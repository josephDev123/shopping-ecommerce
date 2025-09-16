import { AxiosError } from "axios";

type IErrorMsgDataFormat = {
  msg: string;
  name: string;
  operational: boolean;
  type: string;
};
export function AxiosErrorHandler(error: unknown): IErrorMsgDataFormat {
  if (error instanceof AxiosError) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      return error.response.data as IErrorMsgDataFormat;
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
      return error.request;
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
      //   return error.message;
      return {
        msg: error.message,
        name: "UnknownError",
        operational: false,
        type: "error",
      };
    }
    // console.log(error.config);
  }
  // Return a default error message if error is not an AxiosError
  return {
    msg: "An unknown error occurred.",
    name: "UnknownError",
    operational: false,
    type: "Unknown",
  };
}
