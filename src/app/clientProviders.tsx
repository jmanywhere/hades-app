"use client";

import { Provider } from "jotai";
import { WagmiConfig } from "wagmi";

import { defaultWagmiConfig, createWeb3Modal } from "@web3modal/wagmi/react";
import { bscTestnet, bsc } from "wagmi/chains";

const projectId = "5b3561f6a7c0319d2fcf6a9d20d6b1e8";

const chains = [
  { ...bsc, name: "BSC" },
  { ...bscTestnet, name: "BSC Testnet" },
];

const wagmiConfig = defaultWagmiConfig({
  projectId,
  chains,
  appName: "HadesCash",
});

export function Providers({ children }: { children: React.ReactNode }) {
  createWeb3Modal({ wagmiConfig, chains, projectId });
  return (
    <Provider>
      <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
    </Provider>
  );
}
