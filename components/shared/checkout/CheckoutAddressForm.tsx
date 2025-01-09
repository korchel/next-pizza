import { Input, Textarea } from "@/components/ui";
import { WhiteBlock } from "../WhiteBlock";

export const CheckoutAddressForm = () => {
  return (
    <WhiteBlock title="3. Address">
      <div className="flex flex-col gap-5">
        <Input name="address" className="text-base" placeholder="address" />
        <Textarea
          rows={5}
          className="text-base"
          placeholder="comment to the order"
        />
      </div>
    </WhiteBlock>
  );
};
