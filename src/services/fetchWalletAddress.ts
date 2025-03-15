import { blockfrostFetch } from "../lib/blockfrostFetch";

import type { WalletData } from "../types/blockfrost";

export const fetchWalletAddress = async (address: string) => {
  const walletAddressEndpoint = `/addresses/${address}/extended`;

  if (!address) {
    return;
  }

  try {
    const result = await blockfrostFetch<WalletData>(walletAddressEndpoint);

    return result;
  } catch (e) {
    throw new Error(`Error during fetch wallet address\n Info: ${e}`);
  }
};
