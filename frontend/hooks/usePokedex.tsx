import { useQuery } from "@tanstack/react-query";
import gameVersion from "@/utils/gameVersion";
import { nationalPokedex } from "@/lib/getNationalPokedex";
import { regionalPokedex } from "@/lib/getRegionalPokedex";

export default function usePokedex(ver: keyof typeof gameVersion) {
  const version = gameVersion[ver];
  const { data: natDex } = useQuery({
    queryKey: ["natDex"],
    queryFn: () => nationalPokedex(),
    staleTime: Infinity,
  });
  const { data: regDex } = useQuery({
    queryKey: ["regDex", ver],
    queryFn: () => regionalPokedex(version.regionalDex),
    staleTime: Infinity,
  });

  return {
    natDex: natDex?.slice(0, version.limit),
    regDex: regDex,
  };
}
