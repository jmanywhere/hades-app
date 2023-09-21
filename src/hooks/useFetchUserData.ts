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

    const data = await readContract({
          address: fountain,
          abi: fountainAbi,
          functionName: "getNerdData",
          args: [address]
    })
    const accounting = await readContract({
      address: fountain,
      abi: fountainAbi,
      functionName: "accounting",
      args: [address]
    })
    setUserFaucet({
      faucetPayout: data[3],
      rebasePayout: data[5],
      hadesPercent: data[6],
      nfv: data[1],
      gfv: data[2],
      maxPayout: data[4],
      pendingAirdrops: accounting[5]
    })
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
    // TODO get price in USD
    setBalance({
      hadesBalance: data[0]?.result || 0n,
      hadesFountainAllowance: data[1]?.result || 0n,
      hadesPrice: 5,
    });
  },[address, setBalance])

  useEffect( () => {
    if(!address) return;
    fetchData();
    fetchTokenData();
    const interval = setInterval( () => {
      fetchData();
      fetchTokenData();
    }, 10000)
    return () => clearInterval(interval)
  },[address, fetchData, fetchTokenData])

  return [fetchData]
};

export default useFetchUserData;