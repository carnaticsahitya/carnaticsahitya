import Link from "next/link"
import type { Song } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type SongListProps = {
  songs: Song[]
}

export default function SongList({ songs }: SongListProps) {
  if (songs.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium">No songs found</h3>
        <p className="text-muted-foreground mt-2">Try adjusting your search criteria</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {songs.map((song) => (
        <Link href={`/songs/${song.slug}`} key={song.slug}>
          <Card className="h-full transition-all hover:shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{song.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Composer</p>
                  <p className="font-medium">{song.composer}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Ragam</p>
                  <p className="font-medium">{song.ragam}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Tala</p>
                  <p className="font-medium">{song.tala}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

