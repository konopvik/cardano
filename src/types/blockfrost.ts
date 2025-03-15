export interface WalletAmount {
  unit: string;
  quantity: string;
}

export interface WalletData {
  address: string;
  amount: WalletAmount[];
  stake_address: string;
  type: string;
  script: boolean;
}

export interface WalletNftData {
  asset?: string;
  name?: string;
  image?: string;
  collection?: string;
  policyId?: string;
  assetName?: string;
  fingerprint?: string;
  description?: string;
  initialMintTxHash?: string;
  metadata?: any;
}

export interface WalletAssetMetadata {
  name?: string;
  image?: string | { [key: string]: string };
  collection?: string;
  description?: string;
}

export interface WalletAssetInfo {
  asset_name?: string;
  policy_id?: string;
  fingerprint?: string;
  initial_mint_tx_hash?: string;
  onchain_metadata?: WalletAssetMetadata;
  metadata?: WalletAssetMetadata;
  quantity?: string;
}

export interface WalletTransaction {
  tx_hash: string;
  block_height: string;
}

export interface WalletTransactionDetails {
  hash: string;
  block: string;
  block_height: number;
  block_time: number;
  slot: number;
  index: number;
  output_amount: WalletAmount[];
  fees: string;
  deposit: string;
  size: number;
  invalid_before: null;
  invalid_hereafter: null;
  utxo_count: number;
  withdrawal_count: number;
  mir_cert_count: number;
  delegation_count: number;
  stake_cert_count: number;
  pool_update_count: number;
  pool_retire_count: number;
  asset_mint_or_burn_count: number;
  redeemer_count: number;
  valid_contract: boolean;
}

export interface WalletUtxo {
  address: string;
  amount: WalletAmount[];
  tx_hash: string;
  output_index: number;
  data_hash?: string | null;
  inline_datum?: string | null;
  reference_script_hash?: string | null;
  collateral: boolean;
  reference: boolean;
  consumedByTx?: string | null;
}

export interface WalletUtxos {
  inputs: WalletUtxo[];
  outputs: WalletUtxo[];
}

export interface Transaction {
  txHash: string;
  timestamp: number;
  block: string;
  slot: number;
  index: number;
  amount: number;
  fee?: number;
  deposit: number;
  size: number;
  validContract: boolean;
  outputAmount: WalletAmount[];
  utxoCount: number;
  withdrawalCount: number;
  mirCertCount: number;
  delegationCount: number;
  stakeCertCount: number;
  poolUpdateCount: number;
  poolRetireCount: number;
  assetMintOrBurnCount: number;
  redeemerCount: number;
  inputs: {
    address: string;
    amount: WalletAmount[];
    txHash: string;
    outputIndex: number;
    dataHash?: string | null;
    inlineDatum?: string | null;
    referenceScriptHash?: string | null;
    collateral: boolean;
    reference: boolean;
  }[];
  outputs: {
    address: string;
    amount: WalletAmount[];
    outputIndex: number;
    dataHash?: string | null;
    inlineDatum?: string | null;
    collateral: boolean;
    referenceScriptHash?: string | null;
    consumedByTx?: string | null;
  }[];
}
