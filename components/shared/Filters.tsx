import { cn } from "@/lib/utils";
import { FC } from "react";
import { Title } from "./Title";
import { FilterCheckbox } from "./FilterCheckbox";
import { Input } from "../ui";
import { RangeSlider } from "./RangeSlider";

interface IFiltersProps {
  className?: string;
}

export const Filters: FC<IFiltersProps> = ({ className }) => {
  return (
    <div className={cn(className)}>
      <Title text="filter" size="sm" className="mb-5 font-bold" />
      <div className="flex flex-col gap-4">
        <FilterCheckbox text="can combine?" value="1" />
        <FilterCheckbox text="new" value="2" />
      </div>
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p>Price from to</p>
        <div className="flex gap-3 mb-5">
          <Input type="number" placeholder="0" min={0} max={1000} defaultValue={0} />
          <Input type="number" placeholder="30000" min={100} max={30000} />
        </div>
        <RangeSlider min={0} max={5000} step={10} value={[0, 5000]} />
        
      </div>
    </div>
  );
};