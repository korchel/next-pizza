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
    <h1>Order #{orderId}</h1>
    <p>
      Pay {totalCost} p. To pay go to <a href={paymentUrl}>link</a>
    </p>
  </div>
);
