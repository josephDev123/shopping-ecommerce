import { FaStar } from "react-icons/fa";

interface ReviewsProps {
  setValue: (value: string) => void;
  value: string;
}

export default function Reviews({ setValue, value }: ReviewsProps) {
  function Label(idx: number) {
    switch (idx) {
      case 1:
        return <label>Very Poor</label>;
      case 2:
        return <label>Poor</label>;
      case 3:
        return <label>Average</label>;
      case 4:
        return <label>Good</label>;
      case 5:
        return <label>Excellent</label>;
      default:
        return null;
    }
  }

  return (
    <section className="flex items-center justify-center gap-4 ">
      {Array.from({ length: 5 }).map((_, idx) => {
        const rating = idx + 1;
        return (
          <div
            key={rating}
            className="flex flex-col gap-2 items-center justify-center"
          >
            <FaStar
              color={value === String(rating) ? "yellow" : ""}
              onClick={(e) => {
                e.stopPropagation();
                setValue(String(rating));
              }}
              className={`sm:text-3xl  text-xl cursor-pointer `}
            />
            <span className="sm:text-base text-xs">{Label(rating)}</span>
          </div>
        );
      })}
    </section>
  );
}
