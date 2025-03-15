import type { FC } from "react";

import { SearchIcon } from "lucide-react";

import { useEffect, useRef, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";

import { fetchWalletAddress } from "../../services/fetchWalletAddress";
import { useWalletStore } from "../../stores/useWalletStore";

export const SearchInput: FC = () => {
  const [focus, setFocus] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>(
    (() => {
      const searchStorage = localStorage.getItem("search_input");
      return searchStorage ?? import.meta.env.VITE_DEFAULT_ADDRESS ?? "";
    })(),
  );

  const debouncedSearchInput = useDebounce<string>(searchInput, 400);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["wallet-address", debouncedSearchInput],
    queryFn: () => fetchWalletAddress(debouncedSearchInput),
    enabled: !!debouncedSearchInput,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const { setWalletData, setLoading, setError } = useWalletStore();

  const inputRef = useRef<HTMLInputElement>(null);

  const toggleFocus = () => {
    setFocus(prev => !prev);
  };

  useEffect(() => {
    if (focus) {
      inputRef.current?.focus();
    }
  }, [focus]);

  useEffect(() => {
    setError(isError);
  }, [isError]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (data) {
      setWalletData(data);
      return;
    }

    setWalletData(undefined);
  }, [data, isLoading]);

  useEffect(() => {
    const searchStorage = localStorage.getItem("search_input");

    if (!searchStorage || debouncedSearchInput !== searchStorage) {
      localStorage.setItem("search_input", debouncedSearchInput);
    }
  }, [debouncedSearchInput]);

  return (
    <div
      className='border border-gray-400 rounded-lg w-[600px] px-2 py-1 relative'
      onClick={toggleFocus}
    >
      <input
        type='text'
        ref={inputRef}
        value={searchInput}
        onChange={e => setSearchInput(e.currentTarget.value)}
        className='bg-transparent focus:outline-none w-[calc(100%-20px)] placeholder:text-primary text-primary text-sm py-1 px-2'
        onBlur={toggleFocus}
        placeholder='Search address...'
      />
      <SearchIcon
        size={20}
        className='text-primary absolute right-1.5 top-1.5'
      />
    </div>
  );
};
