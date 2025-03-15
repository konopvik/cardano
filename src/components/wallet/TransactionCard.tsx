import type { Transaction } from "@/types/blockfrost";
import type { FC } from "react";

import { useState } from "react";

import { TransactionModal } from "../global/modals/TransactionModal";

export const TransactionCard: FC<Transaction> = tx => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { timestamp, amount, txHash } = tx;

  const date = new Date(timestamp * 1000).toLocaleString();
  const isOutgoing = amount < 0;
  const formattedAmount = `${(amount / 1_000_000).toFixed(6)} ₳`;

  return (
    <>
      <div
        className='bg-card cursor-pointer shadow-sm rounded-lg p-4 hover:bg-hover transition border border-border'
        onClick={() => setModalOpen(true)}
      >
        <div className='flex justify-between items-center'>
          <span className='text-secondary font-mono text-sm'>
            {txHash.slice(0, 6)}...{txHash.slice(-6)}
          </span>
          <span className='text-xs text-gray-500'>{date}</span>
        </div>
        <div className='mt-2 flex justify-between items-center'>
          <span
            className={`font-semibold ${
              isOutgoing ? "text-red-500" : "text-green-500"
            }`}
          >
            {isOutgoing ? "-" : "+"} {formattedAmount}
          </span>
        </div>
      </div>
      {modalOpen && (
        <TransactionModal
          transaction={tx}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
};
