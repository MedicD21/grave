import Link from "next/link";
import Image from "next/image";

export function Logo({ size = 96 }: { size?: number }) {
  return (
    <Link
      href='/'
      className={`group inline-flex relative left-5 rounded-full transition-transform duration-500 hover:scale-105`}
    >
      <Image
        src='/logo.png'
        alt='Wreath Whimsy by Kami'
        width={size}
        height={size}
        priority
        className={`rounded-full transition-transformduration-500 group-hover:scale-115`}
      />
    </Link>
  );
}
