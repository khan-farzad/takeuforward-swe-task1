import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";

type BannerProps = {
  hours: number;
  minutes: number;
  seconds: number;
  setHours: Dispatch<SetStateAction<number>>;
  setMinutes: Dispatch<SetStateAction<number>>;
  setSeconds: Dispatch<SetStateAction<number>>;
  showBanner: boolean;
  bannerData: { description: string; link: string };
  setShowBanner: Dispatch<SetStateAction<boolean>>;
};
const Banner = ({
  hours,
  minutes,
  seconds,
  setHours,
  setMinutes,
  setSeconds,
  bannerData,
  showBanner,
  setShowBanner,
}: BannerProps) => {
  const [timerId, setTimerId] = useState();
  const runTimer = (sec: any, min: any, hr: any, tid: any) => {
    if (sec > 0) {
      setSeconds((s) => s - 1);
    } else if (sec === 0 && min > 0) {
      setMinutes((m) => m - 1);
      setSeconds(59);
    } else if (min === 0 && hr > 0) {
      setHours((h) => h - 1);
      setMinutes(59);
      setSeconds(59);
    }

    if (sec === 0 && min === 0 && hr === 0) {
      setShowBanner(false);
      clearInterval(tid);
      return;
    }
  };

  useEffect(() => {
    let tid: any;
    if (showBanner) {
      tid = setInterval(() => {
        runTimer(seconds, minutes, hours, tid);
      }, 1000);
      setTimerId(tid);
    }

    return () => {
      clearInterval(tid);
    };
  }, [showBanner, hours, minutes, seconds]);

  return (
    <div className="absolute z-10 h-screen w-full flex-center backdrop-blur-sm">
      <div className="bg-white rounded-md p-4 w-3/5 md:w-1/2 h-3/4 shadow-md flex flex-col items-end justify-between">
        <button
          onClick={() => setShowBanner(false)}
          className="hover:rotate-90 transition-all duration-150"
        >
          <IoIosCloseCircle className="text-red-600 size-8 " />
        </button>
        <div className="w-full flex flex-col items-center gap-2">
          <p className="text-this-purple  md:text-2xl">BANNER AUTOCLOSES IN </p>
          <div className="flex w-2/3 justify-around items-center">
            <div className="flex flex-col items-center gap-0.5">
              <p className="text-this-off-white text-xs">Hours</p>
              <p className="text-primary text-4xl font-medium">
                {hours < 10 && "0"}
                {hours}
              </p>
            </div>
            <div className="h-7 text-primary text-4xl font-medium ">:</div>
            <div className="flex flex-col items-center gap-0.5">
              <p className="text-this-off-white text-xs">Minutes</p>
              <p className="text-primary text-4xl font-medium">
                {minutes < 10 && "0"}
                {minutes}
              </p>
            </div>
            <div className="h-7 text-primary text-4xl font-medium ">:</div>
            <div className="flex flex-col items-center gap-0.5">
              <p className="text-this-off-white text-xs">Seconds</p>
              <p className="text-primary text-4xl font-medium">
                {seconds < 10 && "0"}
                {seconds}
              </p>
            </div>
          </div>
        </div>
        <div></div>
        <div className="text-this-off-white shadow-md w-full text-center min-h-64">
          {bannerData.description}
        </div>
        <p className="text-this-off-white font-light text-center w-full">
          Link:{" "}
          <a className="text-this-purple font-normal" href={bannerData.link}>
            {bannerData.link}
          </a>
        </p>
      </div>
    </div>
  );
};

export default Banner;
