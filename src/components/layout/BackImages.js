import Image from 'next/image';

function BackImages() {
  return (
    <Image src="/hero.svg" alt="hero" width={'1180'} height={'900'} className="absolute z-10 top-0 right-0 " />
  )
}

export default BackImages
