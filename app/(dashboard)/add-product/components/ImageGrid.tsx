"use client";

import { Images } from "@/app/Images";
import Image from "next/image";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useEffect, useRef } from "react";
import { useUploadFirebaseToFirebase } from "@/app/hooks/useUploadFileToFirebaseStorage";
import {
  FieldError,
  Merge,
  UseFormRegister,
  FieldValues,
} from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type ImageGridType = {
  // error: Merge<FieldError, (FieldError | undefined)[]> | undefined;
  setProductImg: (values: string[]) => void;
  // register: UseFormRegister<any>;
  // setDefaultSelectedImg: (value: (File | undefined)[]) => void;
};
export default function ImageGrid({
  // error,
  setProductImg,
}: // register,
// setDefaultSelectedImg,
ImageGridType) {
  const fileRef = useRef<HTMLInputElement>(null);
  const { downloadedUrl, errorMsg, uploadStageStatus, uploadFile } =
    useUploadFirebaseToFirebase();
  setProductImg(downloadedUrl);

  const handleOnchangeFile = function (e: React.ChangeEvent<HTMLInputElement>) {
    const fileInput = e.target as HTMLInputElement;
    const selectedFile = fileInput.files;
    // setDefaultSelectedImg(selectedFile);
    if (selectedFile) {
      uploadFile("/product", selectedFile);
    }
  };

  return (
    <section className="flex flex-col space-y-3  rounded-md p-3 border">
      <h1 className="font-medium">Product Image</h1>
      <div className="grid grid-cols-2 gap-2 relative h-full object-contain">
        {errorMsg ? (
          <p className="text-xs text-red-400">{errorMsg}</p>
        ) : uploadStageStatus ? (
          <button className="inline-flex gap-1 w-fit bg-green-400 h-fit rounded-md ">
            <AiOutlineLoading3Quarters className="animate-spin" />
            {uploadStageStatus} ...
          </button>
        ) : downloadedUrl.length > 0 ? (
          <>
            {downloadedUrl.map((link) => (
              <img
                src={link}
                alt="product image"
                width={200}
                height={400}
                className="w-[200px]"
              />
            ))}
          </>
        ) : (
          <p className="text-center">Products image preview</p>
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
