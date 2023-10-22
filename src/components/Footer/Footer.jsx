import s from "./Footer.module.scss";

export const Footer = () => {
  return (
    <footer className={s.footer}>
      <div className={s.footer_container}>
        <p>Designed by Dexola - 2023</p>
        <p>© All rights reserved</p>
      </div>
    </footer>
  );
};
