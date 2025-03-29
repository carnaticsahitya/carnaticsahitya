import { getSongs, getSongBySlug } from "@/lib/songs"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const song = await getSongBySlug(params.slug)

  if (!song) {
    return {
      title: "Song Not Found",
    }
  }

  return {
    title: `${song.name} | Carnatic Songs`,
    description: `${song.name} by ${song.composer} in ${song.ragam} ragam and ${song.tala} tala`,
  }
}

export async function generateStaticParams() {
  const songs = await getSongs()

  return songs.map((song) => ({
    slug: song.slug,
  }))
}

export default async function SongPage({ params }: { params: { slug: string } }) {
  const song = await getSongBySlug(params.slug)

  if (!song) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="flex items-center text-primary hover:underline mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to all songs
      </Link>

      <article className="prose prose-slate dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold">{song.name}</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <div className="bg-muted rounded-lg p-4">
            <h2 className="text-sm font-medium text-muted-foreground mb-1">Ragam</h2>
            <p className="text-lg font-medium">{song.ragam}</p>
          </div>
          <div className="bg-muted rounded-lg p-4">
            <h2 className="text-sm font-medium text-muted-foreground mb-1">Tala</h2>
            <p className="text-lg font-medium">{song.tala}</p>
          </div>
          <div className="bg-muted rounded-lg p-4">
            <h2 className="text-sm font-medium text-muted-foreground mb-1">Composer</h2>
            <p className="text-lg font-medium">{song.composer}</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Content</h2>
          <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: song.contentHtml }} />
        </div>
      </article>
    </div>
  )
}

