import type { FC } from "react";

import { Tabs } from "../global/Tabs";
import { WalletNftTab } from "./tabs/WalletNftTab";
import { WalletTransactionsTab } from "./tabs/WalletTransactionsTab";
import { EmptyState } from "../ui/EmptyState";

import { useWalletStore } from "@/stores/useWalletStore";
import { useState } from "react";
import { LoadingSpinner } from "../ui/LoadingSpinner";

export const WalletInfo: FC = () => {
  const [activeTab, setActiveTab] = useState<string>("nfts");

  const { isLoading, walletData } = useWalletStore();

  const tabItems = [
    { label: "NFTs", value: "nfts" },
    { label: "Transactions", value: "transactions" },
  ];

  return (
    <main className='flex flex-col pt-28 pb-8 w-full gap-3 max-w-desktop'>
      <div className=' max-w-desktop flex-col w-full bg-background rounded-lg min-h-[880px] p-2 flex items-center gap-4'>
        {walletData ? (
          <>
            <Tabs
              tabs={tabItems}
              defaultActive={activeTab}
              onChange={tab => setActiveTab(tab)}
              isLoading={isLoading}
            />
            {activeTab === "nfts" && <WalletNftTab />}
            {activeTab === "transactions" && <WalletTransactionsTab />}
          </>
        ) : isLoading ? (
          <div className='flex justify-center mt-10'>
            <LoadingSpinner color='border-gray-600' />
          </div>
        ) : (
          <EmptyState
            title='No wallet found'
            description='Enter a wallet address to fetch wallet information.'
            icon='🔍'
          />
        )}
      </div>
    </main>
  );
};
