"use client";

import Button from "./Button";

// export default function ProductCardLoading() {
//   return (
//     <section classNameName="border border-blue-400 rounded-md min-w-[300px] bg-white">
//       <section classNameName="flex animate-pulse flex-col relative cursor-pointer ">
//         {/* <div classNameName=" flex-col justify-center items-center absolute top-0 w-full h-full  ">
//           <Button
//             textContent=""
//             classNameName=" w-[200px]  text-[#B88E2F] font-bold"
//           />
//         </div> */}
//         <span classNameName="bg-gray-700 rounded-full flex h-5 w-5 flex-col justify-center items-center absolute right-6 top-8 p-1 text-white "></span>

//         <div classNameName="bg-gray-700 h-72 w-full"></div>
//         <div classNameName=" p-2">
//           <p classNameName="font-bold bg-slate-700 h-3"></p>
//           <p classNameName="truncate bg-slate-700 h-3 w-full"></p>
//           <span classNameName="flex justify-between items-center">
//             <p classNameName="font-bold bg-slate-700 h-3 w-3"></p>
//             <p classNameName="bg-slate-700 h-3 w-3"></p>
//           </span>
//         </div>
//       </section>
//     </section>
//   );
// }

export default function ProductCardLoading() {
  return (
    <section className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto"
        >
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-slate-700 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-700 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
