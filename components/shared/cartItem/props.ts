export interface ICartItemProps {
  id: number;
  imageUrl: string;
  details: string;
  name: string;
  price: number;
  quantity: number;
  disabled?: boolean;
}
