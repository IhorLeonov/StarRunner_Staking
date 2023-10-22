import { Layout } from "./components/Layout/Layout";
import { Routes, Route } from "react-router-dom";
import { Stake } from "./pages/Stake/Stake";
import { Withdraw } from "./pages/Withdraw/Withdraw";
import { ClaimRewards } from "./pages/ClaimRewards/ClaimRewards";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="stake" element={<Stake />} />
        <Route path="withdraw" element={<Withdraw />} />
        <Route path="claim-rewards" element={<ClaimRewards />} />
      </Route>
    </Routes>
  );
}

export default App;
