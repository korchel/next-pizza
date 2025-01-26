// import { CartItemDTO } from "@/shared/services/dto/cart.dto";

// interface Props {
//   orderId: number;
//   items: CartItemDTO[];
// }

// export const OrderSucessTemplate: React.FC<Props> = ({ orderId, items }) => (
//   <div>
//     <h1>Спасибо за оплату</h1>
//     <p>Ваш заказ #{orderId} оплачен. Состав заказа:</p>
//     <hr />
//     <ul>
//       {items.map((item) => (
//         <li key={item.id}>
//           {item.productVariant.product.name} | {item.productVariant.price} ₽ x{" "}
//           {item.quantity} шт. = {item.productVariant.price * item.quantity} ₽
//         </li>
//       ))}
//     </ul>
//   </div>
// );

export const OrderSucessTemplate = (orderId: number, totalCost: number) =>
  `<h1>Спасибо за оплату</h1>
  <p>Ваш заказ #${orderId} оплачен. Стоимость заказа: ${totalCost} ₽</p>`;
