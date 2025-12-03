import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const alt = 'Artichaud Studio - Agence Web & Branding'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'black',
          color: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Artichaud.
      </div>
    ),
    {
      ...size,
    }
  )
}   