import Image from "next/image";

export function BrandMark() {
  return <><Image src="/logo-light.svg" width={32} height={32} alt=""/><span>clip<span className="wordmark-light">insights</span><span className="brand-dot">.</span></span></>;
}
