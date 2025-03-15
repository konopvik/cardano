import type { FC } from "react";

interface SkeletonProps {
  className?: string;
}

export const Skeleton: FC<SkeletonProps> = ({ className = "" }) => {
  return <div className={`bg-skeleton animate-pulse ${className}`}></div>;
};
