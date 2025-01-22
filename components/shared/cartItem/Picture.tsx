import Image from "next/image";

interface Props {
  src: string;
  alt: string;
}

export const Picture: React.FC<Props> = ({ src, alt }) => {
  return <Image width={95} height={95} src={src} alt={alt} />;
};
