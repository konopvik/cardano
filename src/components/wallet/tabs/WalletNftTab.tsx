import { memo, type FC } from "react";

import { useWalletStore } from "@/stores/useWalletStore";
import { useQuery } from "@tanstack/react-query";

import { fetchWalletNfts } from "@/services/fetchWalletNfts";
import { NFTCard } from "../NFTCard";
import { EmptyState } from "@/components/ui/EmptyState";

export const WalletNftTab: FC = memo(function WalletNftTabMemoized() {
  const { walletData } = useWalletStore();

  const { data, isLoading } = useQuery({
    queryKey: ["wallet-nfts", walletData],
    queryFn: () => fetchWalletNfts(walletData),
    refetchOnWindowFocus: false,
  });

  const assetAmount = (walletData?.amount ?? []).filter(
    item => item.unit !== "lovelace",
  );

  return (
    <div className='flex flex-wrap justify-center w-full gap-6 py-3'>
      {assetAmount.map((_, index) => (
        <NFTCard
          key={index}
          assetName={data ? data[index]?.assetName : undefined}
          asset={data ? data[index]?.asset : undefined}
          fingerprint={data ? data[index]?.fingerprint : undefined}
          image={data ? data[index]?.image : undefined}
          name={data ? data[index]?.name : undefined}
          policyId={data ? data[index]?.policyId : undefined}
          collection={data ? data[index]?.collection : undefined}
          description={data ? data[index]?.description : undefined}
          metadata={data ? data[index]?.metadata : undefined}
          isLoading={isLoading}
        />
      ))}
      {!isLoading && (!data || !data.length) && !assetAmount.length && (
        <EmptyState
          title='No NFT Found'
          description='We couldn’t find any NFT for this wallet.'
          icon='🔍'
        />
      )}
    </div>
  );
});
