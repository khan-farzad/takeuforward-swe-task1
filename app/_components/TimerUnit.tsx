import { Dispatch, SetStateAction } from "react";
import { FaChevronDown } from "react-icons/fa";

type TimerUnitProps = {
  name: string;
  unit: number;
  setUnit: Dispatch<SetStateAction<number>>;
};

const TimerUnit = ({ unit, setUnit, name }: TimerUnitProps) => {
  const maxValue: number = name === "hours" ? 23 : 59;
  return (
    <div className="select-none flex-center flex-col gap-1">
      <div className="bg-primary text-[#3D3D3D] rounded-2xl w-14 h-28 flex flex-col items-center justify-around">
        <button
          onClick={() => setUnit((unit) => (unit === maxValue ? 0 : unit + 1))}
          className="hover:text-[#7F7F7F]  active:scale-90"
        >
          <FaChevronDown className="rotate-180" />
        </button>
        <div className="overflow-hidden h-6 relative w-full flex-center">
          <div
            style={{ top: `${-unit * 24}px` }}
            className="absolute flex flex-col items-center transition-all duration-200"
          >
            {Array.from({ length: 60 }).map((min, i) => (
              <p key={`${name}-${i}`} className="text-this-grey">
                {i}
              </p>
            ))}
          </div>
        </div>
        <button
          onClick={() => setUnit((unit) => (unit === 0 ? maxValue : unit - 1))}
          className="hover:text-[#7F7F7F] active:scale-90"
        >
          <FaChevronDown />
        </button>
      </div>
      <p className="text-sm text-[rgb(156,163,175)]">{name}</p>
    </div>
  );
};

export default TimerUnit;
