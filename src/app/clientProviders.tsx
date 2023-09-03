"use client";

import { Provider } from "jotai";
import { EthereumClient } from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { WagmiConfig } from "wagmi";

import { chains, config, walletConnectProjectId } from "@/configs/wagmiConfig";

const ethereumClient = new EthereumClient(config, chains);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      <WagmiConfig config={config}>
        {children}
        <Web3Modal
          projectId={walletConnectProjectId}
          ethereumClient={ethereumClient}
        />
      </WagmiConfig>
    </Provider>
  );
}
