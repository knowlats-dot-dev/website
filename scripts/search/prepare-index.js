import path from 'path'
import { promises as fs } from 'fs'
import { globby } from 'globby'
import grayMatter from 'gray-matter'
;(async function () {
  // prepare the dirs
  const workingDir = '../../'
  const srcDir = path.join(workingDir, 'src')
  const publicDir = path.join(workingDir, 'public')
  const contentBlogDir = path.join(srcDir, 'content', 'blog')
  const contentFilePattern = path.join(contentBlogDir, '*.md')
  const indexFile = path.join(publicDir, 'search-index.json')
  const getSlugFromPathname = (pathname) =>
    path.basename(pathname, path.extname(pathname))

  const contentFilePaths = await globby([contentFilePattern])

  if (contentFilePaths.length) {
    const files = contentFilePaths.map(
      async (filePath) => await fs.readFile(filePath, 'utf8')
    )
    const index = []
    let i = 0
    for await (let file of files) {
      const {
        data: { slug, title, description, tags },
        content
      } = grayMatter(file)
      index.push({
        slug: slug || getSlugFromPathname(contentFilePaths[i]),
        category: 'posts',
        title,
        description,
        tags,
        body: content
      })
      i++
    }
    await fs.writeFile(indexFile, JSON.stringify(index))
    console.log(
      `Indexed ${index.length} documents from ${contentBlogDir} to ${indexFile}`
    )
  }
})()
