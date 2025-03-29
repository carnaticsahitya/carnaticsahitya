import { getSongs } from "@/lib/songs"
import SongSearch from "@/components/song-search"

export default async function Home() {
  const songs = await getSongs()

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Carnatic Songs Collection</h1>
      <SongSearch songs={songs} />
    </main>
  )
}

