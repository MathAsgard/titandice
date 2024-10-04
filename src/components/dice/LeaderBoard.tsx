import LeaderboardModal from "./LeaderBoardModal";
import LeaderboardTable from "./LeaderBoardTable";

interface LeaderboardData {
  rank: number;
  player: string;
  bets: string;
  spent: string;
  won: string;
}

const data: LeaderboardData[] = [
  {
    rank: 1,
    player: "0x467...",
    bets: "47281",
    spent: "23.34m",
    won: "5.89m",
  },
  {
    rank: 2,
    player: "0x467...",
    bets: "47281",
    spent: "23.34m",
    won: "5.89m",
  },
  {
    rank: 3,
    player: "0x467...",
    bets: "47281",
    spent: "23.34m",
    won: "5.89m",
  },
  {
    rank: 4,
    player: "0x467...",
    bets: "47281",
    spent: "23.34m",
    won: "5.89m",
  },
  {
    rank: 5,
    player: "0x467...",
    bets: "47281",
    spent: "23.34m",
    won: "5.89m",
  },
  {
    rank: 6,
    player: "0x467...",
    bets: "47281",
    spent: "23.34m",
    won: "5.89m",
  },
  {
    rank: 7,
    player: "0x467...",
    bets: "47281",
    spent: "23.34m",
    won: "5.89m",
  },
  {
    rank: 8,
    player: "0x467...",
    bets: "47281",
    spent: "23.34m",
    won: "5.89m",
  },
  {
    rank: 9,
    player: "0x467...",
    bets: "47281",
    spent: "23.34m",
    won: "5.89m",
  },
  {
    rank: 10,
    player: "0x467...",
    bets: "47281",
    spent: "23.34m",
    won: "5.89m",
  },
  {
    rank: 11,
    player: "0x467...",
    bets: "47281",
    spent: "23.34m",
    won: "5.89m",
  },
  {
    rank: 12,
    player: "0x467...",
    bets: "47281",
    spent: "23.34m",
    won: "5.89m",
  },
  {
    rank: 13,
    player: "0x467...",
    bets: "47281",
    spent: "23.34m",
    won: "5.89m",
  },
  {
    rank: 14,
    player: "0x467...",
    bets: "47281",
    spent: "23.34m",
    won: "5.89m",
  },
  {
    rank: 15,
    player: "0x467...",
    bets: "47281",
    spent: "23.34m",
    won: "5.89m",
  },
  {
    rank: 16,
    player: "0x467...",
    bets: "47281",
    spent: "23.34m",
    won: "5.89m",
  },
  {
    rank: 17,
    player: "0x467...",
    bets: "47281",
    spent: "23.34m",
    won: "5.89m",
  },
  {
    rank: 18,
    player: "0x467...",
    bets: "47281",
    spent: "23.34m",
    won: "5.89m",
  },
  {
    rank: 19,
    player: "0x467...",
    bets: "47281",
    spent: "23.34m",
    won: "5.89m",
  },
];

export default function LeaderBoard() {
  return (
    <div className="box pt-[11px] rounded-[16px] w-full overflow-hidden">
      <div>
        <div className="px-[14px] mb-1 flex items-center justify-between">
          <h3 className=" text-[#01A755] text-[20px] sm:text-[32px] font-bold">
            Leaderboard
          </h3>
          <LeaderboardModal data={data} />
        </div>

        {/* table */}

        <LeaderboardTable leaderBoardModal={false} data={data.slice(0, 8)} />
      </div>
    </div>
  );
}
