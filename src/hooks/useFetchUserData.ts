'use client';

import { fountain, hades } from "@/abi/contracts";
import fountainAbi from "@/abi/FountainABI";
import { balanceAtom, userAtom } from "@/atoms/fountain";
import { useSetAtom } from "jotai";
import { useCallback, useEffect } from "react";
import { erc20ABI, readContracts, useAccount } from "wagmi";
import { readContract } from '@wagmi/core'

const useFetchUserData = () => {
  const { address } = useAccount();
  const setUserFaucet = useSetAtom(userAtom);
  const setBalance = useSetAtom(balanceAtom);

  const fetchData = useCallback(async () => {
    if(!address) return;
    console.log('fetchData')

    const data = await readContract({
          address: fountain,
          abi: fountainAbi,
          functionName: "getNerdData",
          args: [address]
    })
    setUserFaucet({
      faucetPayout: data[4],
      rebasePayout: data[6],
      hadesPercent: data[7],
      nfv: data[2],
      gfv: data[3],
      maxPayout: data[5],
      initFetch: true,
    })
    console.log({faucetData: data})
  },[address, setUserFaucet])

  const fetchTokenData = useCallback(async () => {
    if(!address) return;
    console.log('fetchToken')
    const data = await readContracts({
      contracts:[
        {
          address: hades,
          abi: erc20ABI,
          functionName: "balanceOf",
          args: [address]
        },
        {
          address: hades,
          abi: erc20ABI,
          functionName: "allowance",
          args: [address, fountain]
        },
      ]
    })
    setBalance({
      hadesBalance: data[0]?.result || 0n,
      hadesFountainAllowance: data[1]?.result || 0n,
    });
  },[address, setBalance])

  useEffect( () => {
    const interval = setInterval( () => {
      fetchData();
      fetchTokenData();
    }, 10000)
    return () => clearInterval(interval)
  },[fetchData, fetchTokenData])

  return [fetchData]
};

export default useFetchUserData;