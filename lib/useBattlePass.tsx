import { useEffect, useState } from "react";
import { Service } from "../types/Service";

interface BPObject {
  id: string;
  isPremium: boolean;
  pointValue: number;
  prizeName: string;
}

export interface BPType {
  results: Array<BPObject>;
}

const defaultResult = {
  results: []
};

const useBattlePass = (req: any) => {
  const [bp, setBP] = useState<Service<BPType>>({
    status: "loading",
    payload: defaultResult
  });
  let result = bp;

  useEffect(() => {
    fetch("/api/hackerLive/battlepass")
      .then(res => res.json())
      .then(res => setBP({ status: "loaded", payload: res }))
      .catch(err =>
        setBP({ status: "error", payload: defaultResult, error: err })
      );
  }, []);

  return result;
};

export default useBattlePass;
