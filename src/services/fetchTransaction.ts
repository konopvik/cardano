import type {
  WalletTransaction,
  WalletTransactionDetails,
  WalletUtxos,
  Transaction,
} from "../types/blockfrost";
import { blockfrostFetch } from "../lib/blockfrostFetch";
import { parseTransactionData } from "@/utils/parseTransactionData";

const fetchTransactionDetail = async (txHash: string, address: string) => {
  const transactionDetailsEndpoint = `/txs/${txHash}`;
  const walletUtxosEndpoint = `/txs/${txHash}/utxos`;

  try {
    const [txDetails, utxos] = await Promise.all([
      blockfrostFetch<WalletTransactionDetails>(transactionDetailsEndpoint),
      blockfrostFetch<WalletUtxos>(walletUtxosEndpoint),
    ]);

    return parseTransactionData(txHash, txDetails, utxos, address);
  } catch (error) {
    throw new Error(`Error during fetch transaction details\n Info: ${error}`);
  }
};

export const fetchWalletTransactions = async (
  address: string,
  page: number = 1,
  limit: number = 10,
) => {
  const transactionsEndpoint = `/addresses/${address}/transactions?count=${limit}&page=${page}`;

  try {
    const txs = await blockfrostFetch<WalletTransaction[]>(
      transactionsEndpoint,
    );

    const transactions = (
      await Promise.all(
        txs.map(({ tx_hash }) => fetchTransactionDetail(tx_hash, address)),
      )
    ).filter(Boolean) as Transaction[];

    return transactions;
  } catch (error) {
    throw new Error(`Error during fetch transactions\n Info: ${error}`);
  }
};
