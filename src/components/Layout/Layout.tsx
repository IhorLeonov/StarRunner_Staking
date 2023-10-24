import { Header } from "../Header/Header";
import { MainInfo } from "../MainInfo/MainInfo";
import { Footer } from "../Footer/Footer";
import { Operations } from "../Operations/Operations";
import { NavBar } from "../NavBar/NavBar";
import { FC } from "react";

export const Layout: FC = () => {
  return (
    <>
      <Header />
      <main>
        <MainInfo />
        <NavBar />
        <Operations />
      </main>
      <Footer />
    </>
  );
};
