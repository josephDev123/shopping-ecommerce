import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction, useRef } from "react";
// import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { Row } from "@tanstack/react-table";
import { Shipping } from "../type/ApiShipping";

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
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: any) => {
      try {
      } catch (error) {}
    },
  });

  const handleOnSubmit = (data: any) => {
    console.log(data);
    mutate(data, {
      onError: async (error) => {
        console.log(error);
        // toast.error(error.message);
        return;
      },
      onSuccess: async (data) => {
        // console.log(data.msg);
        // toast.success(data.msg);
        // await queryClient.invalidateQueries({
        //   queryKey: [""],

        // });
        closeBtnRef.current?.click();
        return;
      },
    });
  };

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
          <form onSubmit={handleOnSubmit} className="flex flex-col space-y-4">
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
                {isPending && (
                  <LoaderCircle className="text-yellow-400 text-3xl" />
                )}
                Create
              </Button>
              <DialogClose asChild>
                <Button ref={closeBtnRef} type="button" variant="destructive">
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
