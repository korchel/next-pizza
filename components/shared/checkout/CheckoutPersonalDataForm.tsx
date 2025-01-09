import { Input } from "@/components/ui";
import { WhiteBlock } from "../WhiteBlock";
import { FormInput } from "./form/FormInput";

export const CheckoutPersonalDataForm = () => {
  return (
    <WhiteBlock title="2. User's data">
      <div className="grid grid-cols-2 gap-5">
        <Input name="firstName" className="text-base" placeholder="Name" />
        <Input name="lastName" className="text-base" placeholder="Last name" />
        <Input name="email" className="text-base" placeholder="E-Mail" />
        <FormInput name="phone" className="text-base" placeholder="Phone" />
      </div>
    </WhiteBlock>
  );
};
