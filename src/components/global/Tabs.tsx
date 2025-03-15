import type { FC } from "react";

import { useState } from "react";
import { Skeleton } from "../ui/Skeleton";

interface Tab {
  label: string;
  value: string;
}

interface TabsProps {
  tabs: Tab[];
  defaultActive?: string;
  onChange?: (value: string) => void;
  isLoading?: boolean;
}

export const Tabs: FC<TabsProps> = ({
  tabs,
  defaultActive,
  onChange,
  isLoading = false,
}) => {
  const [activeTab, setActiveTab] = useState(defaultActive || tabs[0]?.value);

  const handleTabClick = (value: string) => {
    setActiveTab(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className=' max-w-desktop justify-center w-full  rounded-lg p-2 flex items-center gap-4'>
      {tabs.map(tab =>
        isLoading ? (
          <Skeleton
            key={tab.value}
            className='px-6 py-2 rounded-lg  w-[200px] h-[40px]'
          />
        ) : (
          <button
            key={tab.value}
            className={`px-6 py-2 rounded-lg text-primary w-[200px] transition-all
            ${
              activeTab === tab.value
                ? "bg-card shadow-md font-semibold text-primary"
                : ""
            }`}
            onClick={() => handleTabClick(tab.value)}
          >
            {tab.label}
          </button>
        ),
      )}
    </div>
  );
};
