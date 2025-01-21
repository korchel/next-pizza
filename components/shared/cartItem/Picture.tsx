import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  className?: string;
}

export const Picture: React.FC<Props> = ({ src, className, alt }) => {
  return (
    <Image width={60} height={60} className={className} src={src} alt={alt} />
  );
};
