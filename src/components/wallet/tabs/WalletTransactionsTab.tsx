import type { FC } from "react";

import { memo } from "react";
import { useWalletStore } from "@/stores/useWalletStore";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchWalletTransactions } from "@/services/fetchTransaction";
import { TransactionCard } from "../TransactionCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export const WalletTransactionsTab: FC = memo(
  function WalletTransactionsTabMemoized() {
    const { walletData } = useWalletStore();

    const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
      useInfiniteQuery({
        queryKey: ["wallet-transactions", walletData],
        queryFn: ({ pageParam = 1 }) =>
          fetchWalletTransactions(walletData?.address ?? "", pageParam, 10),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) =>
          lastPage.length === 10 ? allPages.length + 1 : undefined,
        refetchOnWindowFocus: false,
      });

    const transactions = data?.pages.flat() || [];
    const hasData = transactions && transactions.length > 0;

    return (
      <>
        {(hasData || isLoading) && (
          <div className='w-full max-w-[1098px] mt-3 mx-auto p-6 bg-card rounded-lg shadow-md'>
            <h2 className='text-lg text-primary font-semibold mb-4'>
              Recent Transactions
            </h2>

            {isLoading ? (
              <div className='space-y-3'>
                {[...Array(20)].map((_, index) => (
                  <div
                    key={index}
                    className='h-[86px] bg-gray-200 animate-pulse rounded-lg'
                  />
                ))}
              </div>
            ) : (
              <div className='space-y-4'>
                {transactions &&
                  transactions.length > 0 &&
                  transactions.map(tx => (
                    <TransactionCard key={tx.txHash} {...tx} />
                  ))}
              </div>
            )}

            {hasNextPage && (
              <div className='flex justify-center mt-6'>
                <button
                  className='px-4 py-2 w-[150px] h-[40px] flex items-center justify-center bg-background border border-border text-primary rounded-lg hover:bg-hover transition disabled:opacity-50'
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                >
                  {isFetchingNextPage ? (
                    <LoadingSpinner
                      color='border-white'
                      className='w-[20px] h-[20px]'
                    />
                  ) : (
                    "Load More"
                  )}
                </button>
              </div>
            )}
          </div>
        )}
        {!hasData && !isLoading && (
          <div className='flex flex-wrap justify-center w-full gap-6 py-3'>
            <EmptyState
              title='No Transactions Found'
              description='We couldn’t find any transactions for this wallet.'
              icon='🔍'
            />
          </div>
        )}
      </>
    );
  },
);
