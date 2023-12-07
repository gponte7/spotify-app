'use client'

import { AlbumCard } from '@/components/AlbumCard/albumCard'
import { Loading } from '@/components/AlbumCard/loading'
import { Spinner } from '@/components/Spinner'
import { SpotifyLogo } from '@phosphor-icons/react/dist/ssr/SpotifyLogo'
import { useEffect, useState } from 'react'

interface AlbumImagesProps {
  url: string
}

export interface AlbumProps {
  id?: string
  images: AlbumImagesProps[]
  external_urls: {
    spotify: string
  }
  name: string
}

export default function Home() {
  const [accessToken, setAccessToken] = useState('')
  const [albums, setAlbums] = useState<AlbumProps[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID
  const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)

    const searchInput = e.currentTarget.artist.value

    const searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
    }

    const artistID = await fetch(
      `https://api.spotify.com/v1/search?q=${searchInput}&type=artist`,
      searchParameters,
    )
      .then((response) => response.json())
      .then((data) => {
        return data.artists.items[0].id
      })

    await fetch(
      `https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=album&market=US&limit=50`,
      searchParameters,
    )
      .then((response) => response.json())
      .then((data) => {
        setTimeout(() => {
          setAlbums(data.items)
          setIsSubmitting(false)
        }, 2000)
      })
  }

  useEffect(() => {
    const authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
    }

    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then((response) => response.json())
      .then((data) => setAccessToken(data.access_token))
  }, [CLIENT_ID, CLIENT_SECRET])

  return (
    <div>
      <div className="mx-auto min-h-screen w-full max-w-[1600px] p-10">
        <div className="flex items-center gap-2">
          <SpotifyLogo size={40} />
          <h1 className="font-extrabold text-xl">Search</h1>
        </div>

        <div className="flex items-center justify-center mt-20">
          <h1 className="font-bold text-4xl md:text-6xl md:w-[750px] text-center">
            Busque os álbuns do seu{' '}
            <span className="text-green-600">artista favorito</span>
          </h1>
        </div>

        <div className="p-10 mt-20 bg-zinc-800 rounded-xl flex items-center justify-center">
          <form
            className="w-full grid grid-cols-1 md:flex items-center justify-center gap-6"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Nome do artista"
              required
              name="artist"
              className="px-6 py-3 outline-none placeholder:text-zinc-400 focus:outline-green-600 bg-zinc-100 text-zinc-950 font-semibold rounded-lg flex flex-1 items-center"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-32 flex items-center justify-center px-6 py-3 rounded-lg bg-green-600 text-zinc-100 text-lg font-semibold hover:bg-green-700 disabled:bg-green-700 disabled:cursor-not-allowed transition duration-100"
            >
              {isSubmitting ? <Spinner /> : 'Buscar'}
            </button>
          </form>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-10">
          {isSubmitting ? (
            <>
              {' '}
              <Loading /> <Loading /> <Loading /> <Loading />{' '}
            </>
          ) : (
            albums.map((album) => {
              return (
                <AlbumCard
                  key={album.id}
                  external_urls={album.external_urls}
                  images={album.images}
                  name={album.name}
                />
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
