import type { FC, ReactNode } from "react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
}

export const EmptyState: FC<EmptyStateProps> = ({
  title = "No Data Available",
  description = "Try searching for something or check back later.",
  icon,
}) => {
  return (
    <div className='flex flex-col items-center justify-center text-center p-6 bg-background rounded-lg'>
      {icon && <div className='text-gray-400 text-5xl mb-4'>{icon}</div>}

      <h2 className='text-lg font-semibold text-secondary'>{title}</h2>

      <p className='text-sm text-gray-500 mt-1'>{description}</p>
    </div>
  );
};
