import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  const fontData = readFileSync(join(process.cwd(), 'public/fonts/SpaceGrotesk-Bold.ttf'))

  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: '#F5F0E0',
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Space Grotesk',
          fontSize: 22,
          fontWeight: 700,
          color: '#0d0a0b',
          letterSpacing: '-1px',
        }}
      >
        A
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Space Grotesk',
          data: fontData.buffer as ArrayBuffer,
          weight: 700,
        },
      ],
    }
  )
}
