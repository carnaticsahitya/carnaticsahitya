import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"
import type { Song } from "./types"

const songsDirectory = path.join(process.cwd(), "songs")

export async function getSongs(): Promise<Song[]> {
  // Ensure the directory exists
  if (!fs.existsSync(songsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(songsDirectory)
  const allSongsData = await Promise.all(
    fileNames.map(async (fileName) => {
      // Remove ".md" from file name to get slug
      const slug = fileName.replace(/\.md$/, "")

      // Read markdown file as string
      const fullPath = path.join(songsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")

      // Use gray-matter to parse the song metadata section
      const matterResult = matter(fileContents)

      // Use remark to convert markdown into HTML string
      const processedContent = await remark().use(html).process(matterResult.content)
      const contentHtml = processedContent.toString()

      // Combine the data with the slug
      return {
        slug,
        content: matterResult.content,
        contentHtml,
        name: matterResult.data.name,
        ragam: matterResult.data.ragam,
        tala: matterResult.data.tala,
        composer: matterResult.data.composer,
      }
    }),
  )

  // Sort songs by name
  return allSongsData.sort((a, b) => {
    if (a.name < b.name) {
      return -1
    } else {
      return 1
    }
  })
}

export async function getSongBySlug(slug: string): Promise<Song | null> {
  try {
    const fullPath = path.join(songsDirectory, `${slug}.md`)

    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, "utf8")
    const matterResult = matter(fileContents)

    // Use remark to convert markdown into HTML string
    const processedContent = await remark().use(html).process(matterResult.content)
    const contentHtml = processedContent.toString()

    return {
      slug,
      content: matterResult.content,
      contentHtml,
      name: matterResult.data.name,
      ragam: matterResult.data.ragam,
      tala: matterResult.data.tala,
      composer: matterResult.data.composer,
    }
  } catch (error) {
    console.error(`Error getting song by slug: ${slug}`, error)
    return null
  }
}

