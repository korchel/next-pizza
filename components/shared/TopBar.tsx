import { cn } from "@/lib/utils";
import { FC } from "react";
import { Container } from "./Container";
import { Categories } from "./Categories";
import { SortPopup } from "./SortPopup";

interface ITopBarProps {
  className?: string;
}

export const TopBar: FC<ITopBarProps> = ({ className}) => {
  return (
    <div className={cn(className, 'sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10')}>
      <Container className="mt-10">
        <Categories />
        <SortPopup />
      </Container>
    </div>
  );
};