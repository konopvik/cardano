import type {
  WalletAssetInfo,
  WalletData,
  WalletNftData,
} from "../types/blockfrost";

import { blockfrostFetch } from "../lib/blockfrostFetch";
import { getImageUrl } from "@/utils/getImageUrl";

const fetchAssetInfo = async (asset: { unit: string; quantity: string }) => {
  try {
    const assetInfo = await blockfrostFetch<WalletAssetInfo>(
      `/assets/${asset.unit}`,
    );
    const metadata = assetInfo.onchain_metadata || assetInfo.metadata;
    const isProbablyNft = asset.quantity === "1";

    if (!isProbablyNft || !metadata) return null;

    return {
      asset: asset.unit,
      name: metadata.name || assetInfo.asset_name || "Unknown Asset",
      image: getImageUrl(metadata),
      collection:
        metadata.collection ||
        (assetInfo.policy_id ? assetInfo.policy_id.slice(0, 10) : undefined),
      policyId: assetInfo.policy_id,
      assetName: assetInfo.asset_name,
      fingerprint: assetInfo.fingerprint,
      description: metadata.description as string,
      initialMintTxHash: assetInfo.initial_mint_tx_hash,
      metadata: metadata,
    };
  } catch (error) {
    throw new Error(
      `Failed to fetch metadata for asset ${asset.unit}\n Info: ${error}`,
    );
  }
};

export const fetchWalletNfts = async (assetsRaw?: WalletData) => {
  if (!assetsRaw) {
    return;
  }

  if (!assetsRaw) return;

  const assets = assetsRaw.amount
    .filter(asset => asset.unit !== "lovelace")
    .slice(0, 20);

  const nfts = (await Promise.all(assets.map(fetchAssetInfo))).filter(
    Boolean,
  ) as WalletNftData[];

  return nfts;
};
