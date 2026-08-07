import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Site vitrine WordPress, Webflow ou Wix - Artichaud Studio'
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
          fontSize: 72,
          background: 'black',
          color: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 80px',
        }}
      >
        <div style={{ display: 'flex' }}>Artichaud.</div>
        <div style={{ display: 'flex', fontSize: 36, opacity: 0.7, marginTop: 24 }}>
          WordPress, Webflow ou Wix : le comparatif
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
