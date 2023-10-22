import { Header } from "../Header/Header";
import { MainInfo } from "../MainInfo/MainInfo";
import { Footer } from "../Footer/Footer";
import { Operations } from "../Operations/Operations";
import { NavBar } from "../NavBar/NavBar";

export const Layout = () => {
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
