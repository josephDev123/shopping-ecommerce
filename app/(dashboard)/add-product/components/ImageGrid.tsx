"use client";

import { Images } from "@/app/Images";
import Image from "next/image";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useRef } from "react";
import { useUploadFirebaseToFirebase } from "@/app/hooks/useUploadFileToFirebaseStorage";

export default function ImageGrid() {
  const fileRef = useRef<HTMLInputElement>(null);
  const { downloadedUrl, errorMsg, uploadStageStatus, uploadFile } =
    useUploadFirebaseToFirebase();

  const handleOnchangeFile = function (e: React.ChangeEvent<HTMLInputElement>) {
    const fileInput = e.target as HTMLInputElement;
    const selectedFile = fileInput.files;
    if (selectedFile) {
      uploadFile("/product", selectedFile);
      // console.log(downloadedUrl, errorMsg, uploadStageStatus);
    }
  };
  console.log(downloadedUrl);
  return (
    <section className="flex flex-col space-y-3  rounded-md p-3 border">
      <h1 className="font-medium">Product Image</h1>
      <div className="grid grid-cols-2 gap-2 relative h-full object-contain">
        {errorMsg ? (
          <p>{errorMsg}</p>
        ) : uploadStageStatus ? (
          <p>{uploadStageStatus}</p>
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
          ""
        )}

        {/* <Image
          src={Images.productCat1}
          alt="hello"
          width={200}
          height={400}
          className="w-[200px]"
        />
        
        <Image
          src={Images.productCat2}
          alt="hello"
          width={200}
          height={400}
          className="w-[200px]"
        /> */}
      </div>

      <input
        ref={fileRef}
        type="file"
        className="hidden"
        multiple
        onChange={handleOnchangeFile}
      />
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
