import type { WalletAssetMetadata } from "@/types/blockfrost";

const normalizeIpfsUrl = (url: string) =>
  url.startsWith("ipfs://")
    ? `${import.meta.env.VITE_IPFS_URL}${url.replace("ipfs://", "")}`
    : url;

export const getImageUrl = (metadata: WalletAssetMetadata) => {
  if (!metadata.image) return;

  switch (typeof metadata.image) {
    case "string":
      return normalizeIpfsUrl(metadata.image);

    case "object":
      if (Array.isArray(metadata.image)) {
        const combinedPath = metadata.image.join("");
        return normalizeIpfsUrl(combinedPath);
      }

      for (const key of ["src", "uri", "url", "link"] as const) {
        if (typeof metadata.image[key] === "string") {
          return normalizeIpfsUrl(metadata.image[key]);
        }
      }
      break;
  }

  return;
};
