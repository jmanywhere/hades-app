import { atom } from "jotai";

export const userAtom = atom({
  faucetPayout: 0n,
  rebasePayout: 0n,
  hadesPercent: 0n,
  nfv: 0n,
  gfv: 0n,
  maxPayout: 0n,
  initFetch: false,
})

export const balanceAtom = atom({
  hadesBalance: 0n,
  hadesFountainAllowance: 0n,
})