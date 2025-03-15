import type { FC } from "react";

import { Header } from "@/components/layout/Header";
import { WalletInfo } from "@/components/wallet/WalletInfo";

export const App: FC = () => {
  return (
    <div className='flex justify-center px-4 w-[100vw]'>
      <Header />
      <WalletInfo />
    </div>
  );
};
