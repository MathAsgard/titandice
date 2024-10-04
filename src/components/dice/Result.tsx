import { useDice } from "../provider/DiceProvider";
import SettingPopup from "./SettingPopup";

export default function Result() {
  const { result, loading }: { result: any; loading: boolean } = useDice();

  return (
    <div>
      <div className="box pt-[11px] px-[18px] pb-[24px] rounded-[24px] relative">
        <div className="absolute top-4 right-[18px]">
          <SettingPopup />
        </div>

        <div>
          <h3 className="text-center text-[#01A755] text-[20px] sm:text-[32px] font-bold">
            DICE
          </h3>

          <div className="flex justify-between sm:flex-row flex-col items-center mt-[25px] gap-y-5">
            <div className="flex-1">
              <h2 className="text-center md:text-[72px] text-[48px] font-black not-italic leading-none text-white stroke-[1px] stroke-white bg-gradient-to-b from-[#FFFCFC] to-[#BBB] bg-clip-text text-transparent">
                0.01
              </h2>
            </div>
            <div className="flex-1 border border-[#00C565] bg-[#001009] rounded-[24px]">
              <h2 className="text-center md:text-[96px] text-[72px] font-black not-italic leading-none text-[#00C565] stroke-[1px] stroke-[#00C565] bg-gradient-to-b from-[#00C565] to-[#005F31] bg-clip-text text-transparent p-[20px]">
                {loading || !result
                  ? "?"
                  : Number(result[result.length - 1].payout) / 10 ** 6}
              </h2>
            </div>
            <div className="flex-1">
              <h2 className="text-center md:text-[72px] text-[48px] font-black not-italic leading-none text-white stroke-[1px] stroke-white bg-gradient-to-b from-[#FFFCFC] to-[#BBB] bg-clip-text text-transparent">
                0.92
              </h2>
            </div>
          </div>

          <p className="text-center text-white font-semibold tracking-[1.4px] text-[14px] mt-[31px]">
            YOUR RESULT
          </p>
        </div>
      </div>
    </div>
  );
}
