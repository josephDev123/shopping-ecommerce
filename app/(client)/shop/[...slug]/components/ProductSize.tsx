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
