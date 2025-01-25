"use client";

import { FC } from "react";
import { WhiteBlock } from "../WhiteBlock";
import { FormTextarea } from "../form";
import { AddressInput } from "./AddressInput";

interface Props {
  className?: string;
}

export const CheckoutAddressForm: FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="3. Адрес" className={className}>
      <div className="flex flex-col gap-5">
        <AddressInput className="text-base" />
        <FormTextarea
          name="comment"
          rows={5}
          className="text-base"
          placeholder="Комментарий к заказу"
        />
      </div>
    </WhiteBlock>
  );
};
