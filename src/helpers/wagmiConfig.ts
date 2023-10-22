import { createConfig, configureChains, mainnet } from "wagmi";
import { sepolia } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepolia, mainnet],
  [
    alchemyProvider({ apiKey: import.meta.env.VITE_ALCHEMY_PROVIDER }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Dexola camp",
  projectId: import.meta.env.VITE_DEXOLA_PROJECT_ID,
  chains,
});

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export { config, chains };
