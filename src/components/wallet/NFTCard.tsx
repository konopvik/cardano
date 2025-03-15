import type { FC } from "react";

import { Skeleton } from "../ui/Skeleton";

import { useEffect, useState } from "react";

import { fallbackImage } from "@/constants/nft";
import { NFTModal } from "../global/modals/NFTModal";

interface NFTCardProps {
  asset?: string;
  assetName?: string;
  name?: string;
  image?: string;
  collection?: string;
  policyId?: string;
  fingerprint?: string;
  description?: string;
  metadata?: any;
  isLoading: boolean;
}

export const NFTCard: FC<NFTCardProps> = nft => {
  const {
    isLoading,
    collection,
    description,
    fingerprint,
    image,
    name,
    policyId,
  } = nft;

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string | undefined>(image);

  useEffect(() => {
    setImageSrc(image);
  }, [image]);

  return (
    <>
      <div
        className='w-[350px] cursor-pointer h-[380px] bg-card rounded-lg shadow-lg p-4 transition-all flex flex-col justify-between items-start duration-300 overflow-hidden hover:scale-105'
        onClick={() => setModalOpen(true)}
      >
        <div className='w-full h-[200px] overflow-hidden rounded-md bg-gray-200 flex justify-center'>
          {isLoading && (
            <Skeleton className='w-full h-full animate-pulse rounded-md' />
          )}
          <img
            src={imageSrc ? imageSrc : fallbackImage}
            alt={name}
            className={`w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
              isLoading && !imageSrc ? "opacity-0 hidden" : "opacity-100 block"
            }`}
          />
        </div>

        <div className='mt-3 flex flex-col gap-1 h-[100px]'>
          {!isLoading ? (
            <h3 className='text-lg text-primary font-semibold'>{name}</h3>
          ) : (
            <Skeleton className='w-[200px] h-[28px] rounded-md' />
          )}
          {!isLoading ? (
            <p className='text-gray-500 text-sm'>
              {collection || "Unknown Collection"}
            </p>
          ) : (
            <Skeleton className='w-[200px] h-[28px] rounded-md' />
          )}
          {!isLoading ? (
            <p className='text-secondary  text-sm mt-1'>
              {String(description).length > 10
                ? `${String(description).slice(0, 50)}...`
                : description || "No description available"}
            </p>
          ) : (
            <Skeleton className='w-[300px] h-[60px] rounded-md' />
          )}
        </div>
        {!isLoading ? (
          <div className='mt-3 text-xs  text-gray-400'>
            <p>
              <strong>Policy ID:</strong> {policyId && policyId.slice(0, 8)}...
              {policyId && policyId.slice(-4)}
            </p>
            <p>
              <strong>Fingerprint:</strong>{" "}
              {fingerprint && fingerprint.slice(0, 8)}
              ...
              {fingerprint && fingerprint.slice(-4)}
            </p>
          </div>
        ) : (
          <Skeleton className='w-[300px] h-[30px] rounded-md' />
        )}
      </div>
      {modalOpen && <NFTModal nft={nft} onClose={() => setModalOpen(false)} />}
    </>
  );
};
