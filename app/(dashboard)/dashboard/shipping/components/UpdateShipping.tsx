"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction, useActionState } from "react";
// import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import { Row } from "@tanstack/react-table";
import { Shipping } from "../type/ApiShipping";
import { updateShipStatus } from "../actions/updateShipStatus";

const STATUS = [
  "Pending",
  "Processing",
  "Shipped",
  "In Transit",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
  "Returned",
];

interface ICreateFuelModalProps {
  row: Row<Shipping>;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}
export default function UpdateShipping({
  row,
  open,
  onOpenChange,
}: ICreateFuelModalProps) {
  const [state, action, pending] = useActionState(updateShipStatus, {
    error: false,
    msg: "",
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[90%] sm:max-w-[500px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="sm:text-2xl text-xl font-bold">
            Update Shipping
          </DialogTitle>
          <DialogDescription> Update Shipping for product</DialogDescription>
        </DialogHeader>
        <div className="flex-1 w-full gap-2 overflow-y-auto">
          {state.error && (
            <small className="text-red-400 my-2">{state.msg}</small>
          )}
          <form
            // onSubmit={handleOnSubmit}
            action={action}
            // action={updateShipStatus.bind(null, row.original._id)}
            className="flex flex-col space-y-4"
          >
            <input type="hidden" name="id" value={row.original._id} />
            <div className="grid grid-cols-1  gap-2">
              <Label htmlFor="name" className="">
                Product Names
              </Label>
              <Input
                id="name"
                name="name"
                readOnly
                placeholder="Enter product name"
                value={
                  row?.original?.items
                    ?.map((item) => item.productName)
                    .join(",") ?? ""
                }
              />
              {/* 
              {errors.name && (
                <small className="text-red-400">{errors.name.message}</small>
              )} */}
            </div>

            <div className="grid grid-cols-1  gap-2">
              <Label htmlFor="status" className="">
                Update Status Progress
              </Label>
              <select name="status" id="status" className="p-2 rounded-md">
                <option value="">Change the product Progress</option>
                {STATUS.map((status, i) => (
                  <option key={i} value={status}>
                    {status}
                  </option>
                ))}
              </select>

              {/* {errors.pumpId && (
                <small className="text-red-400">{errors.pumpId?.message}</small>
              )} */}
            </div>

            <DialogFooter className="gap-2 justify-start">
              <Button
                type="submit"
                variant="outline"
                className="inline-flex gap-2 items-center "
              >
                {pending && (
                  <LoaderCircle className="text-yellow-400 text-3xl animate-spin" />
                )}
                Create
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="destructive">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
