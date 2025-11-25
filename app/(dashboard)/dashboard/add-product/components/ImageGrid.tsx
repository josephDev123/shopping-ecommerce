"use client";

import { Images } from "@/app/Images";
import Image from "next/image";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useEffect, useRef } from "react";
// import {
//   returnUploadedImagePattern,
//   useUploadFirebaseToFirebase,
// } from "@/app/hooks/useUploadFileToFirebaseStorage";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoIosClose } from "react-icons/io";
// import { deleteFileOnFirebase } from "@/app/utils/deletefirebasefile";

type ImageGridType = {
  setProductImg: React.Dispatch<React.SetStateAction<FileList | null>>;
  isPending: boolean;
  isError: boolean;
  error: Error | null;
  data: any;
};
export default function ImageGrid({
  setProductImg,
  error,
  isError,
  isPending,
  data,
}: ImageGridType) {
  const fileRef = useRef<HTMLInputElement>(null);
  // const {
  //   downloadedUrl,
  //   setdownloadedUrl,
  //   errorMsg,
  //   uploadStageStatus,
  //   uploadFile,
  // } = useUploadFirebaseToFirebase();
  // setProductImg(downloadedUrl);

  const handleOnchangeFile = function (e: React.ChangeEvent<HTMLInputElement>) {
    const fileInput = e.target as HTMLInputElement;
    const selectedFile = fileInput.files;

    // setDefaultSelectedImg(selectedFile);
    if (selectedFile) {
      // uploadFile("/product", selectedFile);
      setProductImg(selectedFile);
    }
  };

  async function handleFileDelete(path: string) {
    try {
      // const response = await deleteFileOnFirebase(path);
      // setProductImg(downloadedUrl.filter((img) => img.path !== path));
      // setdownloadedUrl(downloadedUrl.filter((img) => img.path !== path));
    } catch (error) {
      throw error;
    }
  }

  return (
    <section className="flex flex-col space-y-3  rounded-md p-3 border">
      <h1 className="font-medium">Product Image</h1>
      <div className="grid grid-cols-2 gap-2 relative h-full object-contain">
        {isError ? (
          <p className="text-xs text-red-400">{error?.message}</p>
        ) : isPending ? (
          <button className="inline-flex gap-1 w-fit bg-green-400 h-fit rounded-md ">
            <AiOutlineLoading3Quarters className="animate-spin" />
            {/* {uploadStageStatus} ... */}
          </button>
        ) : data !== null ? (
          <div className="relative">
            <img
              src={data?.url}
              alt="product image"
              width={200}
              height={400}
              className="w-[200px]"
            />
            <IoIosClose
              onClick={() => handleFileDelete(data.secureUrl)}
              className="absolute top-0.5 right-0.5 cursor-pointer text-2xl  text-red-500 hover:text-red-300 rounded-full p-0.5 "
            />
          </div>
        ) : (
          <p className="text-sm">Products image preview</p>
        )}
      </div>

      <input
        type="file"
        className="hidden"
        multiple
        onChange={handleOnchangeFile}
        // {...register("productImage", { onChange: handleOnchangeFile })}
        ref={fileRef}
      />
      <span className="text-xs text-red-500">
        {/* {error &&
          Object.entries(error).flatMap(
            ([, message]) => message?.toString() + ", "
          )} */}
      </span>

      <div
        onClick={() => fileRef.current?.click()}
        className="flex flex-col justify-center items-center cursor-pointer border-2 border-dashed h-28 py-3"
      >
        <IoCloudUploadOutline className="text-xl" />
        <p>Drag or upload your files</p>
      </div>
    </section>
  );
}
