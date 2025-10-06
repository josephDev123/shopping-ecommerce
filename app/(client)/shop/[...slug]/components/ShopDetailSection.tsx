"use client";

import React, {
  Dispatch,
  SetStateAction,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";
import ProductDescription from "./ProductDescription";
import AdditionalInformation from "./AdditionalInformation";
import Reviews from "./Reviews";
import { ProductResponseType } from "@/app/types/productsType";
import { FullProduct } from "@/app/types/productWithRelatedItem";
import Dialog from "@/app/(client)/generic/Modal/Dialogs";
import { axiosInstance } from "@/app/axiosInstance";
import { toast } from "react-toastify";
import { ReviewDistribution, ReviewsResponse } from "../type/IReviews";
import { CgSpinner } from "react-icons/cg";
import { formatDistanceToNow } from "date-fns";
import { AxiosErrorHandler } from "@/app/utils/AxiosErrorHandler";
import { useSession } from "next-auth/react";

interface ShopDetailSectionProps {
  data: FullProduct;
  CountData: (info: ICountData) => void;
}

export type ICountData = {
  totalReview: number;
  distribution: ReviewDistribution;
};

type IloadStatus = "isError" | "isLoading" | "data" | "idle";
export default function ShopDetailSection({
  data,
  CountData,
}: ShopDetailSectionProps) {
  const [status, setStatus] = useState<IloadStatus>("idle");
  const [submitStatus, setSubmitStatus] = useState<IloadStatus>("idle");
  const [expand, setExpand] = useState("description");
  const [rate, setRate] = useState<string | null>(null);
  const [AddReview, setAddReview] = useState("");
  const [reviews, setReviews] = useState<ReviewsResponse | null>(null);

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    CountData({
      distribution: reviews?.distribution!,
      totalReview: reviews?.totalReview!,
    });
  }, [reviews?.totalReview]);

  const { data: session } = useSession();

  const productDataArray = Array.isArray(data) ? data : [data];
  const product = productDataArray[0] as FullProduct;
  console.log(AddReview, rate);
  const total = reviews?.totalReview;
  const pageSize = 5;

  const getReviews = async () => {
    setStatus("isLoading");
    try {
      const req = await axiosInstance({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_BASEURL}/api/reviews/find?productId=${data._id}`,
      });

      const responseData = req.data;

      console.log(responseData);
      setReviews(responseData.data);
      setStatus("data");
    } catch (error) {
      const errorObj = AxiosErrorHandler(error);
      toast.error(errorObj.msg);
    }
  };
  useEffect(() => {
    getReviews();
  }, []);

  // keep track of the current page
  const [currentPage, setCurrentPage] = useState(1);

  // calculate total number of pages
  const totalPages = Math.ceil(total! / pageSize);

  // check if there is a next page
  const hasNext = currentPage < totalPages;
  const hasPrev = currentPage > 1;

  const handleNext = () => {
    if (hasNext) {
      setCurrentPage((prev) => prev + 1);
      // fetch or filter next page data here
    }
  };

  const handlePrev = () => {
    if (hasPrev) {
      setCurrentPage((prev) => prev - 1);
      // fetch or filter previous page data here
    }
  };

  async function submitReview() {
    if (!session?.user.id) {
      toast.error("Login to review the item/product.");
      return;
    }
    if (!data._id || !AddReview?.trim() || !rate) {
      toast.error(
        "Please fill in all required fields before submitting your review."
      );
      return;
    }
    setSubmitStatus("isLoading");
    try {
      const req = await axiosInstance({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_BASEURL}/api/reviews/create`,
        data: JSON.stringify({
          productId: data._id,
          userId: session?.user.id,
          content: AddReview,
          rating: Number(rate),
        }),
      });

      const result = req.data;
      console.log(result);

      // setReviews([...reviews, result]);
      setSubmitStatus("data");
      toast.success("Review added successfully");
      setRate("");
      setAddReview("");

      await getReviews();
    } catch (error) {
      setSubmitStatus("isError");
      const errorObj = AxiosErrorHandler(error);
      toast.error(errorObj.msg);
    }
  }

  return (
    <div className="flex flex-col w-full h-full  ">
      <div className="flex justify-center  w-full items-center  gap-8 py-5 px-4">
        <h3
          className={`text-lg cursor-pointer ${
            expand === "description" && "font-bold underline underline-offset-1"
          }`}
          onClick={() => setExpand("description")}
        >
          Description
        </h3>
        {/* <h3
          className={`text-lg cursor-pointer ${
            expand === "additional_Information" && "font-bold"
          }`}
          onClick={() => setExpand("additional_Information")}
        >
          Additional Information
        </h3> */}
        <h3
          className={`text-lg cursor-pointer ${
            expand === "reviews" && "font-bold  underline underline-offset-1"
          }`}
          onClick={() => setExpand("reviews")}
        >
          Reviews
        </h3>
      </div>
      <div className="flex justify-center sm:w-[70%] w-[90%] mx-auto mb-4">
        {expand === "description" && (
          <div className="w-full p-2">
            <ProductDescription description={product.Description} />
          </div>
        )}
        {/* {expand === "additional_Information" && <AdditionalInformation />} */}
        {expand === "reviews" && (
          <div className="w-full">
            <Dialog>
              <Dialog.ModalTrigger>
                <button type="button" className="mb-1">
                  Add Rate⭐
                </button>
              </Dialog.ModalTrigger>
              <Dialog.Modal OverLayClass="">
                <Reviews setValue={setRate} value={rate!} />
              </Dialog.Modal>
            </Dialog>
            <textarea
              // ref={textAreaRef}
              value={AddReview}
              rows={6}
              onChange={(e) => setAddReview(e.target.value)}
              className="w-full p-2 rounded-md border"
              placeholder="Rate your experience (1–5) and add a short comment (pros/cons)."
            />
            <button
              onClick={submitReview}
              type="button"
              className="px-2 rounded-md py-1 inline-flex gap-1 items-center text-white bg-blue-400"
            >
              Create{" "}
              {submitStatus === "isLoading" && (
                <CgSpinner className="animate-spin text-yellow-500 text-2xl" />
              )}
            </button>

            <div className="mt-4">
              <h1 className="text-lg font-semibold">Reviews</h1>
              {status === "isLoading" ? (
                <div className="w-full flex flex-col items-center justify-center h-28">
                  <CgSpinner className="animate-spin text-yellow-500 text-2xl" />
                </div>
              ) : status === "isError" ? (
                <div className="w-full flex flex-col items-center justify-center h-28 text-red-300 text-sm">
                  Something went wrong
                </div>
              ) : reviews?.reviews.length === 0 ? (
                <div className="w-full flex flex-col items-center justify-center h-28 text-sm">
                  No Reviews
                </div>
              ) : (
                <Suspense
                  fallback={
                    <CgSpinner className="animate-spin text-yellow-500 text-2xl" />
                  }
                >
                  <div className="w-full flex flex-col h-28 space-y-2">
                    {reviews?.reviews.map((review, idx) => (
                      <div key={idx} className="flex flex-col">
                        <h1 className="text-purple-600 font-bold">
                          {review.userId.name}
                        </h1>
                        <p className="text-sm">
                          {formatDistanceToNow(new Date(review?.createdAt), {
                            addSuffix: true,
                          })}
                        </p>
                        <p className="text-sm">{review.content}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 items-center mt-4">
                    {/* Previous Button */}
                    <button
                      disabled={!hasPrev}
                      onClick={handlePrev}
                      type="button"
                      className="bg-gray-300 text-sm py-1 px-3 rounded-md disabled:opacity-50"
                    >
                      Prev
                    </button>

                    <span className="text-sm">
                      Page {currentPage} of {totalPages || 1}
                    </span>

                    {/* Next Button */}
                    <button
                      disabled={!hasNext}
                      onClick={handleNext}
                      type="button"
                      className="bg-yellow-300 text-sm py-1 px-3 rounded-md disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </Suspense>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
