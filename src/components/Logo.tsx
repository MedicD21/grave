import Link from "next/link";
import Image from "next/image";

export function Logo({ compact = false }: { compact?: boolean }) {
  const size = compact ? 44 : 56;
  return (
    <Link href='/' className='group inline-flex items-center'>
      <Image
        src='/logo.png'
        alt='Wreath Whimsy by Kami'
        width={size}
        height={size}
        priority
        className='h-auto w-auto rounded-full transition-transform duration-500 group-hover:scale-105'
        style={{ width: size, height: size }}
      />
    </Link>
  );
}
