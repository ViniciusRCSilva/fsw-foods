import Image from "next/image";

interface PromoBannerProps {
  src: string;
  alt: string;
}

const PromoBanner = (props: PromoBannerProps) => {
  return (
    <Image
      src={props.src}
      alt={props.alt}
      height={0}
      width={0}
      className="h-auto w-full object-contain"
      sizes="100vw"
      quality={100}
    />
  );
};

export default PromoBanner;
