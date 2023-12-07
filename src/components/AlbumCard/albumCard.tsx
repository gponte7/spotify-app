/* eslint-disable camelcase */
import { AlbumProps } from '@/app/page'
import Image from 'next/image'
import Link from 'next/link'

export function AlbumCard({ images, name, external_urls }: AlbumProps) {
  return (
    <Link
      href={external_urls.spotify}
      target="_blank"
      className="h-96 flex flex-col items-center gap-10 bg-zinc-800 p-10 rounded-xl"
    >
      <Image
        alt=""
        src={images[0].url}
        width={200}
        height={200}
        quality={100}
        className="rounded-lg"
      />
      <h1 className="text-zinc-100 font-bold tracking-wider text-lg text-center flex items-center h-full">
        {name}
      </h1>
    </Link>
  )
}
