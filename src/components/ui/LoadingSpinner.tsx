import type { FC } from "react";

interface LoadingSpinnerProps {
  color?: string;
  className?: string;
}

export const LoadingSpinner: FC<LoadingSpinnerProps> = ({
  color = "border-blue-500",
  className = "h-[100px] w-[100px]",
}) => {
  return (
    <div
      className={` border-4 border-solid border-t-transparent ${color} rounded-full animate-spin ${
        className ? className : ""
      }`}
    />
  );
};
