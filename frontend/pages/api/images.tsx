import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs/promises'
import path from 'path'

async function getFilesRecursive(directory: string): Promise<string[]> {
    const files: string[] = []

    async function traverse(dir: string) {
        const dirents = await fs.readdir(dir, { withFileTypes: true })
        await Promise.all(
            dirents.map(async (dirent) => {
                const res = path.resolve(dir, dirent.name)
                if (dirent.isDirectory()) {
                    await traverse(res)
                } else {
                    files.push(res)
                }
            })
        )
    }

    await traverse(directory)
    return files
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // publicディレクトリ内のimagesフォルダのパスを取得
        const imagesFolderPath = path.join(process.cwd(), 'public', 'images')

        // imagesディレクトリ内のファイルを再帰的に取得
        const filePaths = await getFilesRecursive(imagesFolderPath)

        // ファイルの絶対パスのリストをクライアントに送信
        const relativePaths = filePaths.map((filePath) => path.relative(imagesFolderPath, filePath))

        // ファイル名のリストをクライアントに送信
        res.status(200).json(relativePaths)
    } catch (error) {
        console.error('Error fetching image files:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}
