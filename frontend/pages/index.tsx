import React, { useState, useEffect } from 'react'

const ImageList = () => {
    const [imageFiles, setImageFiles] = useState<string[]>([])

    useEffect(() => {
        const fetchImageFiles = async () => {
            try {
                // APIエンドポイントから画像ファイル名のリストを取得
                const response = await fetch('/api/images')
                const fileNames = await response.json()
                console.log(fileNames)
                // 画像ファイル名を設定
                setImageFiles(fileNames)
            } catch (error) {
                console.error('Error fetching image files:', error)
            }
        }

        fetchImageFiles()
    }, []) // 最初の1回だけ実行

    return (
        <div>
            <h1>Image List</h1>
            <div>
                {imageFiles.map((fileName, index) => (
                    <img
                        key={index}
                        src={`/images/${fileName}`}
                        alt={`Image ${index + 1}`}
                        style={{ width: '100px', height: '100px', margin: '5px' }}
                    />
                ))}
            </div>
        </div>
    )
}

export default ImageList
