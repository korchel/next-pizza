import { FC } from "react";

interface Props {
  name: string;
  details: string;
  className?: string;
}

export const Info: FC<Props> = ({ name, details, className }) => {
  return (
    <div className={className}>
      <div className={"flex items-center justify-between"}>
        <h2 className="sm:text-lg font-bold flex-1 leading-5">{name}</h2>
      </div>
      <p className="text-xs text-gray-400 w-[90%]">{details}</p>
    </div>
  );
};
