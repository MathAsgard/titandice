import { useState } from "react";
import Dropdown from "./Dropdown";
import AllBetsTable from "./AllBetsTable";
import MyBetsTable from "./MyBetsTable";
import HighRollersTable from "./HighRollersTable";
import RareWinsTable from "./RareWinsTable";

export default function Table() {
  const [tab, setTab] = useState("all");

  //show data
  const [numberOfData, setNumberOfData] = useState(10);

  //handle numer of data
  const handleClick = (text: string) => {
    setTab(text);
    setNumberOfData(10);
  };
  return (
    <div>
      <div className="flex justify-between items-center flex-col sm:flex-row">
        <div className=" w-full md:bg-[#071913] rounded-[8px] md:w-fit py-[4px] px-[6px] md:flex grid  grid-cols-2 items-center sm:gap-x-[30px] gap-[10px] flex-wrap ">
          <button
            onClick={() => handleClick("all")}
            className={`text-[14px] rounded-[8px] font-semibold tracking-[1.4px] py-[11.5px] sm:px-[19.5px] px-[10px]  ${
              tab === "all"
                ? "text-[#071913] bg-[#01A755]"
                : "text-white bg-[#071913]"
            }`}
          >
            ALL BETS
          </button>
          <button
            onClick={() => handleClick("my")}
            className={`text-[14px] rounded-[8px] font-semibold tracking-[1.4px] py-[11.5px] sm:px-[19.5px] px-[10px]] ${
              tab === "my"
                ? "text-[#071913] bg-[#01A755]"
                : "text-white bg-[#071913]"
            }`}
          >
            MY BETS
          </button>
          <button
            onClick={() => handleClick("high")}
            className={`text-[14px] rounded-[8px] font-semibold tracking-[1.4px] py-[11.5px] sm:px-[19.5px] px-[10px]  ${
              tab === "high"
                ? "text-[#071913] bg-[#01A755]"
                : "text-white bg-[#071913]"
            }`}
          >
            HIGH ROLLERS
          </button>
          <button
            onClick={() => handleClick("rare")}
            className={`text-[14px] rounded-[8px] font-semibold tracking-[1.4px] py-[11.5px]  sm:px-[19.5px] px-[10px] ${
              tab === "rare"
                ? "text-[#071913] bg-[#01A755]"
                : "text-white bg-[#071913]"
            }`}
          >
            RARE WINS
          </button>
        </div>

        <div className="hidden md:block">
          <Dropdown
            numberOfData={numberOfData}
            setNumberOfData={setNumberOfData}
          />
        </div>
      </div>

      {/* table */}

      <div className="lg:mt-[46px] mt-[20px] overflow-x-scroll scrollbar-hide">
        {tab === "all" && <AllBetsTable numberOfData={numberOfData} />}
        {tab === "my" && <MyBetsTable numberOfData={numberOfData} />}
        {tab === "high" && <HighRollersTable numberOfData={numberOfData} />}
        {tab === "rare" && <RareWinsTable numberOfData={numberOfData} />}
      </div>
    </div>
  );
}
