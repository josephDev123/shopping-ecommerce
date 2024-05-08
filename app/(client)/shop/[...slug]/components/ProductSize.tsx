interface IProductSize {
  className: string;
}

export default function ProductSize({ className }: IProductSize) {
  return (
    <div className={`${className} flex flex-col space-y-2`}>
      <h3 className="text-black/80">Size</h3>
      <div className="flex gap-4">
        <button type="button" className="p-2 bg-[#F9F1E7] font-medium">
          L
        </button>
        <button type="button" className="p-2 bg-[#F9F1E7] font-medium">
          XL
        </button>
        <button type="button" className="p-2 bg-[#F9F1E7] font-medium">
          XS
        </button>
      </div>
    </div>
  );
}

interface IProductColor {
  className: string;
}

export function ProductColor({ className }: IProductColor) {
  return (
    <div className={`${className} flex flex-col space-y-2`}>
      <h3 className="text-black/80">Color</h3>
      <div className="flex gap-4">
        <button
          type="button"
          className="p-5 bg-[#816DFA] font-medium rounded-full w-fit"
        ></button>
        <button
          type="button"
          className="p-5 bg-[#000000] font-medium rounded-full w-fit"
        ></button>
        <button
          type="button"
          className="p-5 bg-[#B88E2F] font-medium rounded-full w-fit"
        ></button>
      </div>
    </div>
  );
}
