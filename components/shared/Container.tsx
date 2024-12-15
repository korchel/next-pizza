import { cn } from '@/shared/lib/utils';
import React, { FC, PropsWithChildren } from 'react';

interface IContainerProps {
  className?: string;
}

export const Container: FC<PropsWithChildren<IContainerProps>> = ({ className, children }) => {
  return <div className={cn('mx-auto max-w-[1280px]', className)}>{children}</div>;
};