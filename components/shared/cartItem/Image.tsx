import { cn } from '@/shared/lib/utils';

interface Props {
  src: string;
  className?: string;
}

export const Image: React.FC<Props> = ({ src, className }) => {
  return <img className={cn('w-[60px] h-[60px]', className)} src={src} />;
};