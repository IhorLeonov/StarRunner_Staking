import "./sass/index.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@rainbow-me/rainbowkit/styles.css";

import { config, chains } from "./helpers/wagmiConfig";
import { WagmiConfig } from "wagmi";
import { RainbowKitProvider, midnightTheme } from "@rainbow-me/rainbowkit";
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from "./context/context";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <WagmiConfig config={config}>
        <RainbowKitProvider
          modalSize="compact"
          chains={chains}
          theme={midnightTheme({
            accentColor: "#204ffe",
            borderRadius: "medium",
            overlayBlur: "small",
          })}
        >
          <ContextProvider>
            <App />
          </ContextProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </BrowserRouter>
  </React.StrictMode>
);
