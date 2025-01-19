import { FC } from "react";

import { WhiteBlock } from "../WhiteBlock";
import { FormInput } from "../form";

interface Props {
  className?: string;
}

export const CheckoutPersonalDataForm: FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="2. User's data" className={className}>
      <div className="grid grid-cols-2 gap-5">
        <FormInput name="firstName" className="text-base" placeholder="Name" />
        <FormInput
          name="lastName"
          className="text-base"
          placeholder="Last name"
        />
        <FormInput name="email" className="text-base" placeholder="E-Mail" />
        <FormInput name="phone" className="text-base" placeholder="Phone" />
      </div>
    </WhiteBlock>
  );
};
