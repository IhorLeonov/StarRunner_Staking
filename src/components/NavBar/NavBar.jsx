import { NavLink } from "react-router-dom";
import s from "./NavBar.module.scss";

export const NavBar = () => {
  // adding blue border to active tab
  const isActive = ({ isActive }) => (isActive ? "active_tab" : "");

  return (
    <nav className={s.nav_bar_container}>
      <div className={s.nav_bar}>
        <NavLink className={isActive} to="/stake">
          Stake
        </NavLink>
        <NavLink className={isActive} to="/withdraw">
          Withdraw
        </NavLink>
        <NavLink className={isActive} to="/claim-rewards">
          Claim rewards
        </NavLink>
      </div>
    </nav>
  );
};
