import { useEffect, useState } from "react";
import { useAccount, usePublicClient, useWriteContract } from "wagmi";
import { useDice } from "../provider/DiceProvider";
import { formatNumber } from "../../utils/formatNumber";
import { payoutRate } from "../../web3/consts/bet";
import TitanGamesABI from "../../web3/abis/TitanGM.json";
import { TitanGamesContract } from "../../web3/consts/contracts";
import { decimals } from "../../web3/consts/token";
import { parseEther } from "viem";

export default function MultiBets() {
  const account = useAccount();
  const { credBalance, refetch, loading } = useDice();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const [activeTab, setActiveTab] = useState("min");
  const [activeTab2, setActiveTab2] = useState("min");
  const [multiBetAmount, setMultiBetAmount] = useState(0);
  const [numberOfBets, setNumberOfBets] = useState(1);
  const [multiBetPayout, setMultiBetPayout] = useState(0);

  // Payout
  useEffect(() => {
    if (credBalance && Number(credBalance) < multiBetAmount * numberOfBets) {
      // Not enough balance
      alert("You have a mistake in betting options. Balance is not enough");
      setMultiBetAmount(0);
      setNumberOfBets(1);
    }

    setMultiBetPayout(
      Number((payoutRate * multiBetAmount * numberOfBets).toFixed(2))
    );
  }, [multiBetAmount, numberOfBets]);

  const handleChangeAmount = (method: string) => {
    if (method === "min") {
      // Set Min Amount
      setActiveTab("min");
      setMultiBetAmount(1);
    } else if (method === "1/2") {
      // Set 1/2 Amount
      setActiveTab("1/2");
      if (multiBetAmount !== 1) {
        setMultiBetAmount(multiBetAmount / 2);
      }
    } else if (method === "x2") {
      // Set 2x Amount
      setActiveTab("x2");
      setMultiBetAmount(multiBetAmount * 2);
    }
  };

  const handleChangeNumberOfBets = (method: string) => {
    if (method === "min") {
      // Set Min Amount
      setActiveTab2("min");
      setNumberOfBets(1);
    } else if (method === "50") {
      // Set 1/2 Amount
      setActiveTab2("50");
      setNumberOfBets(50);
    } else if (method === "100") {
      // Set 2x Amount
      setActiveTab2("100");
      setNumberOfBets(100);
    }
  };

  const handleMultiBet = async () => {
    if (multiBetAmount === 0 || !account.isConnected) return;

    try {
      const hash = await writeContractAsync({
        abi: TitanGamesABI,
        address: TitanGamesContract,
        functionName: "multiBet",
        args: [
          numberOfBets,
          parseEther((multiBetAmount * numberOfBets).toString()),
        ],
      });

      await publicClient?.waitForTransactionReceipt({ hash });

      // To Do Animation

      setMultiBetAmount(0);
      setNumberOfBets(1);
      refetch();
      alert("Success");
    } catch (error) {
      console.log("Internal server error during a single bet", error);
      alert(error);
    }
  };

  return (
    <div className="max-w-[580px] mx-auto sm:px-[40px] px-[20px] sm:pt-[41px] pt-[20px] sm:pb-[48px] pb-[20px]">
      <div className="flex justify-between items-center py-[6px] px-[10px] border border-[#0F3627] rounded-[8px]">
        <h4 className="text-white/60 text-[14px] tracking-[1.4px] font-semibold">
          BALANCE
        </h4>
        <h4 className="text-white/40 text-[14px] tracking-[1.4px] font-semibold">
          {loading || !credBalance
            ? "0"
            : formatNumber(Number(credBalance) / decimals)}{" "}
          CREDITS
        </h4>
      </div>

      {/* bets */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[19px] gap-[9px] mt-[16px]">
        <div className="flex flex-col gap-2">
          <div
            className="bg-[#001009] rounded-[8px] overflow-hidden border border-[#0F3627] flex "
            style={{
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset",
            }}
          >
            <div className="min-w-[56px] max-w-[56px] min-h-full flex-1 bg-[#0F3627] flex justify-center items-center">
              <div className="bg-[#3cab56] w-[28px] h-[28px] rounded-full"></div>
            </div>

            <div className="p-[10px] h-[70px]">
              <input
                type="number"
                className="text-white/60 bg-transparent border-none outline-none text-[24px] font-semibold leading-[100%]"
                placeholder="0.0000"
                min={1}
                value={multiBetAmount}
                onChange={(e) => setMultiBetAmount(Number(e.target.value))}
              />

              <h5 className="text-white/30 font-semibold text-[16px]">
                $0.0000
              </h5>
            </div>
          </div>

          <div className="flex gap-[5px]">
            <button
              onClick={() => handleChangeAmount("min")}
              className={`text-[14px] flex-1   py-[6px]  rounded-[8px]    ${
                activeTab === "min"
                  ? "bg-[#64E180] font-semibold text-[#071913]"
                  : "bg-[#0F3627] font-normal text-white/60"
              }`}
            >
              min
            </button>
            <button
              onClick={() => handleChangeAmount("1/2")}
              className={`text-[14px] flex-1   py-[6px]  rounded-[8px]    ${
                activeTab === "1/2"
                  ? "bg-[#64E180] font-semibold text-[#071913]"
                  : "bg-[#0F3627] font-normal text-white/60"
              }`}
            >
              1/2
            </button>
            <button
              onClick={() => handleChangeAmount("x2")}
              className={`text-[14px] flex-1   py-[6px]  rounded-[8px]    ${
                activeTab === "x2"
                  ? "bg-[#64E180] font-semibold text-[#071913]"
                  : "bg-[#0F3627] font-normal text-white/60"
              }`}
            >
              x2
            </button>
          </div>

          <div
            className="bg-[#001009] rounded-[8px] overflow-hidden border border-[#0F3627] flex sm:mt-2"
            style={{
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset",
            }}
          >
            <div className="min-w-[86px] max-w-[86px] min-h-full flex-1 bg-[#0F3627] flex justify-center items-center text-white/60 text-center text-[14px] font-medium">
              Payout <br /> on Win
            </div>

            <div className="p-[10px] h-[70px]">
              <input
                type="number"
                className="text-white/60 bg-transparent border-none outline-none text-[24px] font-semibold leading-[100%]"
                placeholder="0.0000"
                value={multiBetPayout}
                disabled
              />

              <h5 className="text-white/30 font-semibold text-[16px]">
                $0.0000
              </h5>
            </div>
          </div>
        </div>

        {/* right */}
        <div className="flex flex-col gap-2">
          <div
            className="bg-[#001009] rounded-[8px] overflow-hidden border border-[#0F3627] flex "
            style={{
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset",
            }}
          >
            <div className="min-w-[86px] max-w-[86px] min-h-full flex-1 bg-[#0F3627] flex justify-center items-center text-white/60 text-center text-[14px] font-medium">
              Number <br /> of Bets
            </div>

            <div className="p-[10px] h-[70px] flex items-center">
              <input
                type="number"
                className="text-white/60 bg-transparent border-none outline-none text-[24px] font-semibold leading-[100%]"
                placeholder="75"
                min={1}
                value={numberOfBets}
                onChange={(e) => setNumberOfBets(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="flex gap-[5px]">
            <button
              onClick={() => handleChangeNumberOfBets("min")}
              className={`text-[14px] flex-1   py-[6px]  rounded-[8px]    ${
                activeTab2 === "min"
                  ? "bg-[#64E180] font-semibold text-[#071913]"
                  : "bg-[#0F3627] font-normal text-white/60"
              }`}
            >
              min
            </button>
            <button
              onClick={() => handleChangeNumberOfBets("50")}
              className={`text-[14px] flex-1   py-[6px]  rounded-[8px]    ${
                activeTab2 === "50"
                  ? "bg-[#64E180] font-semibold text-[#071913]"
                  : "bg-[#0F3627] font-normal text-white/60"
              }`}
            >
              50
            </button>
            <button
              onClick={() => handleChangeNumberOfBets("100")}
              className={`text-[14px] flex-1   py-[6px]  rounded-[8px]    ${
                activeTab2 === "100"
                  ? "bg-[#64E180] font-semibold text-[#071913]"
                  : "bg-[#0F3627] font-normal text-white/60"
              }`}
            >
              100
            </button>
          </div>

          <button
            className="mt-2.5 p-[18px] border border-[#64E180] bg-gradient-to-r from-[#69E885] to-[#39A753] text-[#071913] font-extrabold text-[20px] traking-[2px] rounded-[8px] transition-all duration-100 ease-linear hover:border-[#64E180] hover:from-[#021D11] hover:to-[#021D11] hover:text-[#64E180]"
            onClick={handleMultiBet}
          >
            BET
          </button>
        </div>
      </div>
    </div>
  );
}
