'use client'

export default function myImageLoader({ src, width, quality }) {
  return `https://next-image-transform.svanhildstub.com/image/${src}?w=${width}&q=${quality || 75}`
}
