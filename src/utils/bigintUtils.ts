import { formatEther } from "viem"

export const fromBigIntToReadable = (value: bigint):string => {
  return parseFloat(formatEther(value)).toLocaleString();
}