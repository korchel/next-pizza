import { cn } from "@/shared/lib/utils";
import { FC } from "react";

import { Container } from "../../ui";
import { Categories } from "./Categories";
// import { SortPopup } from "./SortPopup";
import { Category } from "@prisma/client";

interface Props {
  categories: Category[];
  className?: string;
}

export const TopBar: FC<Props> = ({ categories, className }) => {
  return (
    <div
      className={cn(
        className,
        "sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10"
      )}
    >
      <Container>
        <Categories items={categories} />
        {/* <SortPopup /> */}
      </Container>
    </div>
  );
};
