import { CartItemDTO } from "@/shared/services/dto/cart.dto";

interface Props {
  orderId: number;
  items: CartItemDTO[];
}

export const OrderSucessTemplate: React.FC<Props> = ({ orderId, items }) => (
  <div>
    <h1>Thank you for buying</h1>
    <p>Your order #{orderId} has been paid. Order items:</p>
    <hr />
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.productVariant.product.name} | {item.productVariant.price} P x{" "}
          {item.quantity} pcs. = {item.productVariant.price * item.quantity} P
        </li>
      ))}
    </ul>
  </div>
);
