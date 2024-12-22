import { Button } from "@/components/ui";
import { cn } from "@/shared/lib/utils";
import { Minus, Plus } from "lucide-react";
import { FC } from "react";

interface IPlusMinusButtonProps {
  onClick?: () => void;
  type: 'plus' | 'minus';
  disabled?: boolean;
  className?: string;
}

export const PlusMinusButton: FC<IPlusMinusButtonProps> = ({ type, disabled, onClick, className }) => {
  const Icon = {
    plus: <Plus className="h-4" />,
    minus: <Minus className="h-4" />,
  }
  return (
    <Button
      className={cn(
        className,
        'p-0 hover:bg-primary hover:text-white disabled:bg-white disabled:border-gray-400',
        'w-[30px] h-[30px] rounded-sm'
      )}
      disabled={disabled}
      variant="outline"
      onClick={onClick}
    >
      {Icon[type]}
    </Button>
  )
};