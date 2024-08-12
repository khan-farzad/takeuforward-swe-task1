"use client";
import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import TimerUnit from "./TimerUnit";
import Banner from "./Banner";
import axios from "axios";

const Dashboard = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isLoading, setIsLoading] = useState(true)
  const timeInSeconds = seconds + minutes*60 + hours*3600
  const [showBanner, setShowBanner] = useState(false);
  const [bannerData, setBannerData] = useState<{
    description: string;
    link: string;
    expiryTime: number;
  }>({
    description: "",
    link: "",
    expiryTime: -1
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBannerData({ ...bannerData, [e.target.name]: e.target.value });
  };

  const fetchBannerData = async () => {
    setIsLoading(true)
    try {
      const res = await axios.get(
        "https://takeuforward-backend-production.up.railway.app"
      );
      setBannerData({
        link: res.data[0].link,
        description: res.data[0].description,
        expiryTime: res.data[0].expiryTime
      });
      const timeRemainingInMilliseconds = parseInt(res.data[0].expiryTime) - Date.now()
      if(timeRemainingInMilliseconds > 0) {
        setShowBanner(true)
        setSeconds(Math.floor((timeRemainingInMilliseconds/1000)%60))
        setMinutes(Math.floor((timeRemainingInMilliseconds/60000)%60))
        setHours(Math.floor((timeRemainingInMilliseconds/3600000)))
      }
      else {
        setShowBanner(false)
      }
    } catch (error) {
      console.log("error in fetching banner data");
    }
    finally {
      setIsLoading(false)
    }
  };

  const handlePreview = async () => {
    setShowBanner(true);
    try {
      const req = await axios.put(
        "https://takeuforward-backend-production.up.railway.app",
        {
          description: bannerData.description,
          link: bannerData.link,
          expiryTime: (timeInSeconds*1000+Date.now()).toString()
        }
      );
    } catch (error) {
      console.log("error in updating banner data");
    }
  };

  useEffect(() => {
    fetchBannerData();
  }, []);

  if (isLoading)
    return (<div className="h-screen flex-center text-this-purple animate-pulse text-2xl">Loading...</div>)
  return (
    <div className="h-screen flex-center">
      {showBanner && (
        <Banner
          showBanner={showBanner}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
          setHours={setHours}
          setMinutes={setMinutes}
          setSeconds={setSeconds}
          bannerData={bannerData}
          setShowBanner={setShowBanner}
        />
      )}
      <div className="shadow-sm h-3/4 w-3/5 text-center sm:w-1/2 lg:w-1/3 rounded-lg flex flex-col justify-around items-center">
        <h2 className="text-lg md:text-2xl font-semibold">
          PREVIEW YOUR BANNER
        </h2>
        <div className="w-full px-4 flex flex-col gap-2">
          <h3 className="text-xl font-medium">Enter URL</h3>
          <input
            name="link"
            onChange={handleChange}
            autoFocus
            type="text"
            className="w-full bg-transparent ring-primary rounded-xl ring-1 py-3 px-4"
            placeholder="Example: https://www.google.com/"
          />
        </div>
        <div className="w-full px-4 flex flex-col gap-2">
          <h3 className="text-xl font-medium">Enter Description</h3>
          <input
            name="description"
            onChange={handleChange}
            type="text"
            className="w-full bg-[transparent] ring-primary rounded-xl ring-1 py-3 px-4"
            placeholder="Enter your promotional message here"
          />
        </div>
        <div className="w-full px-4 flex flex-col gap-2">
          <h3 className="text-xl font-medium">Set timer for the banner</h3>
          <div className="w-full flex justify-around items-center">
            <TimerUnit unit={hours} setUnit={setHours} name="hours" />
            <TimerUnit unit={minutes} setUnit={setMinutes} name="min" />
            <TimerUnit unit={seconds} setUnit={setSeconds} name="sec" />
          </div>
        </div>
        <button
          className="bg-primary relative group overflow-hidden rounded-lg p-4 text-this-grey"
          onClick={handlePreview}
        >
          <div
            className={`absolute rounded-lg top-0 size-full -left-full group-hover:left-0 transition-all duration-200 bg-this-purple flex-center`}
          >
            <FaChevronDown className="text-this-grey -rotate-90" />
          </div>
          Preview Banner
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
