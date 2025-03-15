import type {
  Transaction,
  WalletTransactionDetails,
  WalletUtxos,
} from "@/types/blockfrost";

export const parseTransactionData = (
  txHash: string,
  txDetails: WalletTransactionDetails,
  utxos: WalletUtxos,
  address: string,
): Transaction => {
  const calculateAmount = (utxoList: typeof utxos.inputs, sign: number) =>
    utxoList.reduce((sum, { address: addr, amount }) => {
      if (addr !== address) return sum;
      const lovelace = amount.find(({ unit }) => unit === "lovelace");
      return sum + (lovelace ? parseInt(lovelace.quantity) * sign : 0);
    }, 0);

  const amount =
    calculateAmount(utxos.inputs, -1) + calculateAmount(utxos.outputs, 1);

  return {
    txHash,
    timestamp: txDetails.block_time,
    block: String(txDetails.block_height),
    slot: txDetails.slot,
    index: txDetails.index,
    fee: txDetails.fees ? parseInt(txDetails.fees) : undefined,
    deposit: parseInt(txDetails.deposit),
    size: txDetails.size,
    amount,
    validContract: txDetails.valid_contract,
    outputAmount: txDetails.output_amount.map(({ unit, quantity }) => ({
      unit,
      quantity,
    })),
    utxoCount: txDetails.utxo_count,
    withdrawalCount: txDetails.withdrawal_count,
    mirCertCount: txDetails.mir_cert_count,
    delegationCount: txDetails.delegation_count,
    stakeCertCount: txDetails.stake_cert_count,
    poolUpdateCount: txDetails.pool_update_count,
    poolRetireCount: txDetails.pool_retire_count,
    assetMintOrBurnCount: txDetails.asset_mint_or_burn_count,
    redeemerCount: txDetails.redeemer_count,
    inputs: utxos.inputs.map(input => ({
      address: input.address,
      amount: input.amount.map(({ unit, quantity }) => ({
        unit,
        quantity,
      })),
      txHash: input.tx_hash,
      outputIndex: input.output_index,
      dataHash: input.data_hash,
      inlineDatum: input.inline_datum,
      referenceScriptHash: input.reference_script_hash,
      collateral: input.collateral,
      reference: input.reference,
    })),
    outputs: utxos.outputs.map(output => ({
      address: output.address,
      amount: output.amount.map(({ unit, quantity }) => ({
        unit,
        quantity,
      })),
      outputIndex: output.output_index,
      dataHash: output.data_hash,
      inlineDatum: output.inline_datum,
      collateral: output.collateral,
      referenceScriptHash: output.reference_script_hash,
    })),
  };
};
