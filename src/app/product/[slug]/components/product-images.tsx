'use client'

import Image from "next/image"
import { useState } from "react"

interface ProductImageProps {
  name:string
  imageUrls: string[]
}

export const ProductImages = ({imageUrls, name}: ProductImageProps) => {
  const [currentImage, setCurrentImage] = useState(imageUrls[0])

  const handleImageClick = (imageUrl: string) => {
    setCurrentImage(imageUrl)
  }

  return (
    <div className="flex flex-col">
      <div className="flex bg-accent h-[380px] w-full items-center justify-center">
        <Image 
          src={currentImage}
          alt={name}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto max-h-[70%] w-auto max-w-[80%] "
          style={{
            objectFit: 'contain'
          }}
        />
      </div>

      <div className="grid grid-cols-4 gap-4 mt-8 px-5">
        {imageUrls.map((imageUrl) =>(
          <button 
            key={imageUrl} 
            className={`bg-accent flex items-center justify-center rounded-lg h-[100px]
              ${imageUrl === currentImage && 'border-2 border-primary border-solid'}
            `}
            onClick={() => handleImageClick(imageUrl)}
          >
            <Image 
              src={imageUrl}
              alt={name}
              width={0}
              height={0}
              sizes="100vw"
              className="h-auto max-h-[70%] w-auto max-w-[80%] "
              style={{
                objectFit: 'contain'
              }}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
