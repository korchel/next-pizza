interface Props {
  orderId: number;
  totalCost: number;
  paymentUrl: string;
}

export const PayOrderTemplate: React.FC<Props> = ({
  orderId,
  totalCost,
  paymentUrl,
}) => (
  <div>
    <h1>Заказ #{orderId}</h1>
    <p>
      Оплатите {totalCost} ₽. Для оплаты перейдите по{" "}
      <a href={paymentUrl}>ссылке</a>
    </p>
  </div>
);
