import { createContext, useContext, ReactNode } from "react";
import { useAccount, useReadContract } from "wagmi";

import TitanxABI from "../../web3/abis/Titanx.json";
import TitanGamesABI from "../../web3/abis/TitanGM.json";
import {
  TitanGamesContract,
  TitanxContract,
  zeroAddress,
} from "../../web3/consts/contracts";

interface DiceContextType {
  loading: boolean;
  titBalance: any; // Replace any with the actual type if known
  credBalance: any; // Replace any with the actual type if known
  result: any;
  refetch: () => void;
}

export const DiceContext = createContext<DiceContextType | null>(null);

interface DiceProviderProps {
  children: ReactNode;
}

export const DiceProvider = ({ children }: DiceProviderProps) => {
  const { isConnected, address } = useAccount();
  const isEnabled = isConnected && !!address;

  // Get Titanx Balance
  const {
    data: titanxBalance,
    isLoading: titanxLoading,
    refetch: refetchTitanxBalance,
  } = useReadContract({
    abi: TitanxABI,
    address: TitanxContract,
    functionName: "balanceOf",
    args: [address ?? zeroAddress],
    query: { enabled: isEnabled },
  });

  // Get Credit Balance
  const {
    data: creditBalance,
    isLoading: creditLoadinng,
    refetch: refetchCreditBalance,
  } = useReadContract({
    abi: TitanGamesABI,
    address: TitanGamesContract,
    functionName: "getRemainingCredits",
    args: [address ?? zeroAddress],
    query: { enabled: isEnabled },
  });

  // Get Latest Bet Result
  const {
    data: betResult,
    isLoading: resultLoading,
    refetch: refetchLatestBetResult,
  } = useReadContract({
    abi: TitanGamesABI,
    address: TitanGamesContract,
    functionName: "getUserBets",
    args: [address ?? zeroAddress],
    query: { enabled: isEnabled },
  });

  const refetch = () => {
    refetchTitanxBalance();
    refetchCreditBalance();
    refetchLatestBetResult();
  };

  return (
    <DiceContext.Provider
      value={{
        loading: titanxLoading || creditLoadinng || resultLoading,
        titBalance: titanxBalance,
        credBalance: creditBalance,
        result: betResult,
        refetch,
      }}
    >
      {children}
    </DiceContext.Provider>
  );
};

export const useDice = () => {
  const context = useContext(DiceContext);
  if (!context) {
    throw new Error("useDice must be used within a DiceProvider");
  }
  return context;
};
