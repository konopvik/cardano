import type { Transaction } from "@/types/blockfrost";
import { useEffect, type FC } from "react";

interface TransactionModalProps {
  transaction: Transaction | null;
  onClose: () => void;
}

export const TransactionModal: FC<TransactionModalProps> = ({
  transaction,
  onClose,
}) => {
  const handleClose = () => {
    document.body.style.overflowY = "auto";
    onClose();
  };

  useEffect(() => {
    const body = document.body;

    body.style.overflowY = "hidden";
  }, []);

  if (!transaction) return null;

  return (
    <div
      className='fixed top-[-18px] left-0  w-[100vw] h-[100vh] bg-black bg-opacity-50 flex justify-center items-center z-50'
      onClick={handleClose}
    >
      <div
        className='relative bg-card w-full max-w-lg mx-4 md:mx-0 p-6 rounded-lg shadow-xl transform scale-100 transition-all'
        onClick={e => e.stopPropagation()}
      >
        <div className='flex justify-between items-center border-b pb-4'>
          <h2 className='text-xl font-bold text-primary'>
            Transaction Details
          </h2>
          <button
            onClick={handleClose}
            className='text-secondary hover:text-gray-700 text-lg'
          >
            ✖
          </button>
        </div>
        <div className='mt-6 space-y-5'>
          <div className='flex justify-between items-center bg-background p-3 rounded-lg'>
            <span className='text-secondary text-sm'>Transferred Amount</span>
            <p className='text-lg font-semibold text-green-600'>
              {(transaction.amount / 1_000_000).toFixed(6)} ₳
            </p>
          </div>
          <div className='flex justify-between items-center'>
            <span className='text-gray-500 text-sm'>Transaction Fee</span>
            <span className='font-semibold text-secondary'>
              {(transaction.fee ?? 0) / 1_000_000} ₳
            </span>
          </div>
          <div>
            <h3 className='text-secondary text-sm font-medium'>
              Transferred Assets
            </h3>
            <ul className='text-sm mt-1 h-[105px] overflow-y-auto'>
              {transaction.outputAmount.map(({ unit, quantity }) => (
                <li key={unit} className='text-secondary'>
                  {unit === "lovelace"
                    ? `ADA: ${(Number(quantity) / 1_000_000).toFixed(6)} ₳`
                    : `Asset ${unit.slice(-6)}: ${quantity}`}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className='text-gray-600 text-sm font-medium'>
              Transaction ID
            </h3>
            <p className='text-xs font-mono break-all text-secondary bg-background p-2 rounded-md'>
              {transaction.txHash}
            </p>
          </div>
          <div>
            <h3 className='text-gray-600 text-sm font-medium'>Date & Time</h3>
            <p className='text-sm text-secondary'>
              {new Date(transaction.timestamp * 1000).toLocaleString()}
            </p>
          </div>
          <div className='grid grid-cols-2 gap-4 text-sm'>
            <div>
              <span className='text-gray-500'>Block Height</span>
              <p className='font-semibold text-secondary'>
                {transaction.block}
              </p>
            </div>
            <div>
              <span className='text-gray-500'>Size</span>
              <p className='font-semibold text-secondary'>
                {transaction.size} bytes
              </p>
            </div>
          </div>
          <div className='text-center mt-6'>
            <a
              href={`https://adastat.net/transactions/${transaction.txHash}`}
              target='_blank'
              rel='noopener noreferrer'
              className='text-accent hover:underline font-medium'
            >
              View on Adastat
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
