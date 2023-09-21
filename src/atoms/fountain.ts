import { atom } from "jotai";

export const userAtom = atom({
  faucetPayout: 0n,
  rebasePayout: 0n,
  hadesPercent: 0n,
  nfv: 0n,
  gfv: 0n,
  maxPayout: 0n,
  pendingAirdrops: 0n,
})

export const balanceAtom = atom({
  hadesBalance: 0n,
  hadesFountainAllowance: 0n,
  hadesPrice: 5, // price in USD
})