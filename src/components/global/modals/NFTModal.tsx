import type { WalletNftData } from "@/types/blockfrost";
import type { FC } from "react";

import { useEffect } from "react";

import { fallbackImage } from "@/constants/nft";

interface NFTModalProps {
  nft: WalletNftData | null;
  onClose: () => void;
}

export const NFTModal: FC<NFTModalProps> = ({ nft, onClose }) => {
  const getImageUrl = (url: string) =>
    url.startsWith("ipfs://")
      ? `https://ipfs.io/ipfs/${url.replace("ipfs://", "")}`
      : url;

  const handleClose = () => {
    document.body.style.overflowY = "auto";
    onClose();
  };

  useEffect(() => {
    const body = document.body;

    body.style.overflowY = "hidden";
  }, []);

  if (!nft) return null;

  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
      onClick={handleClose}
    >
      <div
        className='relative bg-card w-full max-w-md mx-4 md:mx-0 p-6 rounded-xl shadow-xl transform scale-100 transition-all'
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className='absolute top-3 right-4 text-secondary hover:text-gray-700 text-xl'
        >
          ✖
        </button>
        <div className='w-full flex justify-center'>
          <img
            src={nft.image ? getImageUrl(nft.image) : fallbackImage}
            alt={nft.name}
            className='w-64 h-64 object-cover rounded-lg shadow-md'
          />
        </div>
        <div className='mt-4 space-y-4 text-center'>
          <h2 className='text-xl font-semibold text-primary'>{nft.name}</h2>

          <p className='text-sm text-gray-500'>
            Collection:{" "}
            <span className='font-medium'>
              {nft.collection ? nft.collection : "Unknown"}
            </span>
          </p>

          {nft.description && (
            <p className='text-sm text-secondary italic'>{nft.description}</p>
          )}

          {nft.metadata && (
            <div className='text-sm text-gray-700 border-t pt-3'>
              <h3 className='font-semibold text-primary'>Attributes</h3>
              <ul className='flex flex-wrap justify-center gap-2 mt-2'>
                {Object.entries(nft.metadata).map(([key, value]) =>
                  typeof value === "string" &&
                  key !== "name" &&
                  key !== "description" ? (
                    <li
                      key={key}
                      className='bg-background px-3 py-1 text-primary rounded-md text-xs'
                    >
                      <strong>{key}:</strong> {value}
                    </li>
                  ) : null,
                )}
              </ul>
            </div>
          )}

          <div className='text-sm text-gray-500 border-t pt-3'>
            <h3 className='font-semibold text-secondary'>Policy ID</h3>
            <p className='font-mono text-xs break-all'>{nft.policyId}</p>
          </div>

          <div className='mt-4'>
            <a
              href={`https://adastat.net/tokens/${nft.asset}`}
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
