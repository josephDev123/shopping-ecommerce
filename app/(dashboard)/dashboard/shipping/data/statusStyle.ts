export const statusStyles: Record<string, { bg: string; text: string }> = {
  Pending: {
    bg: "bg-gray-300",
    text: "text-gray-700",
  },
  Processing: {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
  },
  Shipped: {
    bg: "bg-indigo-100",
    text: "text-indigo-700",
  },
  "In Transit": {
    bg: "bg-blue-100",
    text: "text-blue-700",
  },
  "Out for Delivery": {
    bg: "bg-purple-100",
    text: "text-purple-700",
  },
  Delivered: {
    bg: "bg-green-100",
    text: "text-green-700",
  },
  Cancelled: {
    bg: "bg-red-100",
    text: "text-red-700",
  },
  Returned: {
    bg: "bg-orange-100",
    text: "text-orange-700",
  },
};
