import { w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { configureChains, createConfig } from 'wagmi'
import { bscTestnet, bsc } from 'wagmi/chains'

export const walletConnectProjectId = '5b3561f6a7c0319d2fcf6a9d20d6b1e8'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [bsc, bscTestnet],
  [w3mProvider({ projectId: walletConnectProjectId })],
)

export const config = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({
    chains,
    projectId: walletConnectProjectId,
  }),
  publicClient,
  webSocketPublicClient,
})

export { chains }