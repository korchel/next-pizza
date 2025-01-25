import { FC } from "react";

import { WhiteBlock } from "../WhiteBlock";
import { FormInput, PhoneInput } from "../form";

interface Props {
  className?: string;
}

export const CheckoutPersonalDataForm: FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="2. Данные пользователя" className={className}>
      <div className="grid grid-cols-2 gap-5">
        <FormInput name="firstName" className="text-base" placeholder="Имя" />
        <FormInput
          name="lastName"
          className="text-base"
          placeholder="Фамилия"
        />
        <FormInput name="email" className="text-base" placeholder="E-Mail" />
        <PhoneInput name="phone" className="text-base" placeholder="Телефон" />
      </div>
    </WhiteBlock>
  );
};
