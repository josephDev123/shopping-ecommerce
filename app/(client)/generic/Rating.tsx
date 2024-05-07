import React from "react";
import { CiStar } from "react-icons/ci";

interface IRating {
  rating: number;
}
export default function Rating({ rating }: IRating) {
  return Array.from({ length: 5 }, (_, index) => {
    return (
      <div key={index} className="flex items-center">
        <CiStar
          className={`${index <= rating ? "text-yellow-300 font-bold" : ""}`}
        />
      </div>
    );
  });
}
