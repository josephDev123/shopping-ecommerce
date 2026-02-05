"use server";

import { revalidateTag, updateTag } from "next/cache";
// import { ShippingsApiResponse } from "../type/ApiShipping";
import { cookies } from "next/headers";

// export async function updateShipStatus(id: string, data: FormData) {
//   const cookie = await cookies();
//   try {
//     const response = await fetch(
//       `${process.env.SERVER_BASEURL}/api/shipping/tracking/${id}`,
//       {
//         method: "POST",
//         headers: {
//           cookie: cookie.toString(),
//         },
//         body: JSON.stringify({
//           status: data.get("status"),
//         }),
//       },
//     );

//     if (!response.ok) {
//       throw new Error(await response.text());
//     }

//     updateTag("shipping");

//     // return (await response.json()) as ShippingsApiResponse;
//   } catch (error) {
//     if (error instanceof Error) {
//       throw new Error(error.message);
//     }

//     throw new Error("Unknown error");
//   }
// }

export async function updateShipStatus(
  prevState: { error: boolean; msg: string },
  formData: FormData,
) {
  const cookie = await cookies();
  const shippingId = formData.get("id");

  if (!shippingId) {
    throw new Error("Required ID");
  }
  const response = await fetch(
    `${process.env.SERVER_BASEURL}/api/shipping/tracking/${shippingId}`,
    {
      method: "PATCH",
      headers: {
        cookie: cookie.toString(),
      },

      body: formData,
    },
  );

  if (!response.ok) {
    // throw new Error(await response.text());

    return {
      error: true,
      msg: (await response.text()) || "Updated successfully",
    };
  }

  updateTag("shipping");
  return {
    error: false,
    msg: "Updated successfully",
  };
}
