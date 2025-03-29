"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Song } from "@/lib/types"
import SongList from "./song-list"

type SearchProps = {
  songs: Song[]
}

export default function SongSearch({ songs }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filteredSongs, setFilteredSongs] = useState<Song[]>(songs)

  // Get unique values for filter dropdowns
  const composers = [...new Set(songs.map((song) => song.composer))].sort()
  const ragams = [...new Set(songs.map((song) => song.ragam))].sort()
  const talas = [...new Set(songs.map((song) => song.tala))].sort()

  useEffect(() => {
    if (!searchTerm) {
      setFilteredSongs(songs)
      return
    }

    const term = searchTerm.toLowerCase()

    const filtered = songs.filter((song) => {
      if (filterType === "name") {
        return song.name.toLowerCase().includes(term)
      } else if (filterType === "composer") {
        return song.composer.toLowerCase().includes(term)
      } else if (filterType === "ragam") {
        return song.ragam.toLowerCase().includes(term)
      } else if (filterType === "tala") {
        return song.tala.toLowerCase().includes(term)
      } else if (filterType === "content") {
        return song.content.toLowerCase().includes(term)
      } else {
        // Search all fields
        return (
          song.name.toLowerCase().includes(term) ||
          song.composer.toLowerCase().includes(term) ||
          song.ragam.toLowerCase().includes(term) ||
          song.tala.toLowerCase().includes(term) ||
          song.content.toLowerCase().includes(term)
        )
      }
    })

    setFilteredSongs(filtered)
  }, [searchTerm, filterType, songs])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search songs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="w-full sm:w-48">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger>
              <SelectValue placeholder="Search in..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Fields</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="composer">Composer</SelectItem>
              <SelectItem value="ragam">Ragam</SelectItem>
              <SelectItem value="tala">Tala</SelectItem>
              <SelectItem value="content">Content</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <SongList songs={filteredSongs} />
    </div>
  )
}

