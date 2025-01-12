import { FC } from "react";
import { WhiteBlock } from "../WhiteBlock";
import { FormInput, FormTextarea } from "./form";

interface Props {
  className?: string;
}

export const CheckoutAddressForm: FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="3. Address" className={className}>
      <div className="flex flex-col gap-5">
        <FormInput name="address" className="text-base" placeholder="address" />

        <FormTextarea
          name="comment"
          rows={5}
          className="text-base"
          placeholder="comment to the order"
        />
      </div>
    </WhiteBlock>
  );
};
