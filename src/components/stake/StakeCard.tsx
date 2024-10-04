import { useState } from "react";

export default function StakeCard() {
  const [active, setActive] = useState("10%");
  return (
    <div className="box rounded-[8px] overflow-hidden">
      <div className="p-[15px] bg-[#001009]">
        <p className="text-center text-white text-[16px] tracking-[1.4px] font-semibold ">
          STAKE
        </p>
      </div>
      <div className="pt-[50px] pb-[13px] sm:px-[40px] px-[16px] flex flex-col gap-[9px]">
        <div className="flex justify-between items-center py-[6px] px-[10px] border border-[#0F3627] rounded-[8px] mb-[7px]">
          <h4 className="text-white/60 text-[14px] tracking-[1.4px] font-semibold">
            MY BALANCE
          </h4>
          <h4 className="text-white/40 text-[14px] tracking-[1.4px] font-semibold">
            14.483B CREDITS
          </h4>
        </div>

        <div
          className="bg-[#001009] rounded-[8px] overflow-hidden border border-[#0F3627] flex "
          style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset" }}
        >
          <div className="min-w-[56px] max-w-[56px] min-h-full flex-1 bg-[#0F3627] flex justify-center items-center">
            <div className="bg-[#3cab56] w-[28px] h-[28px] rounded-full"></div>
          </div>

          <div className="p-[10px] bg-[#001009] ">
            <input
              type="number"
              className="text-white/60 bg-transparent border-none outline-none text-[24px] font-semibold leading-[100%]"
              placeholder="0.0000"
            />

            <h5 className="text-white/30 font-semibold text-[16px]">$0.0000</h5>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-[8px]">
          <button
            onClick={() => setActive("10%")}
            className={`text-[14px]   py-[6px]  rounded-[8px]    ${
              active === "10%"
                ? "bg-[#64E180] font-bold text-[#071913]"
                : "bg-[#0F3627] font-normal text-white/60"
            }`}
          >
            10%
          </button>
          <button
            onClick={() => setActive("25%")}
            className={`text-[14px]   py-[6px]  rounded-[8px]    ${
              active === "25%"
                ? "bg-[#64E180] font-bold text-[#071913]"
                : "bg-[#0F3627] font-normal text-white/60"
            }`}
          >
            25%
          </button>
          <button
            onClick={() => setActive("50%")}
            className={`text-[14px]   py-[6px]  rounded-[8px]    ${
              active === "50%"
                ? "bg-[#64E180] font-bold text-[#071913]"
                : "bg-[#0F3627] font-normal text-white/60"
            }`}
          >
            50%
          </button>
          <button
            onClick={() => setActive("75%")}
            className={`text-[14px]   py-[6px]  rounded-[8px]    ${
              active === "75%"
                ? "bg-[#64E180] font-bold text-[#071913]"
                : "bg-[#0F3627] font-normal text-white/60"
            }`}
          >
            75%
          </button>
          <button
            onClick={() => setActive("max")}
            className={`text-[14px]   py-[6px]  rounded-[8px]    ${
              active === "max"
                ? "bg-[#64E180] font-bold text-[#071913]"
                : "bg-[#0F3627] font-normal text-white/60"
            }`}
          >
            MAX
          </button>
        </div>

        <button className="p-[15px] border border-[#64E180] bg-gradient-to-t from-[#69E885] to-[#39A753] text-[#071913] font-extrabold text-[20px] traking-[2px] rounded-[8px] mt-[16px] transition-all duration-100 ease-linear hover:border-[#64E180] hover:from-[#021D11] hover:to-[#021D11] hover:text-[#64E180]">
          STAKE
        </button>

        <p className="text-center text-white/40 text-[14px] tracking-[1.4px] font-semibold mt-[13px]">
          5% TAX
        </p>
      </div>
    </div>
  );
}
