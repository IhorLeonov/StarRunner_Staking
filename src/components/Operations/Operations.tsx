import { Outlet, useNavigate } from "react-router-dom";
import { FC, Suspense } from "react";
import s from "./Operations.module.scss";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { Notification } from "../Notification/Notification";
import { Stopper } from "../Stopper/Stopper";

export const Operations: FC = () => {
  const navigate = useNavigate();
  const { isConnected } = useAccount();

  useEffect(() => {
    navigate("stake");
  }, []);

  return (
    <section className={s.operations}>
      <div className={s.operations_wrapper}>
        {!isConnected ? (
          <Stopper />
        ) : (
          <>
            <Suspense fallback={null}>
              <Outlet />
            </Suspense>
            <Notification />
          </>
        )}
      </div>
    </section>
  );
};
