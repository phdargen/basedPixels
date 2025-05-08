import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { headers } from 'next/headers'
import { type ReactNode } from 'react'
import { cookieToInitialState } from 'wagmi'

import { getConfig } from '../wagmi'
import { Providers } from './providers'
import StyledComponentsRegistry from '../lib/StyledComponentsRegistry'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BasedPixels',
  description: 'Mint BasedPixels NFTs with sub accounts',
}

export default function RootLayout(props: { children: ReactNode }) {
  const initialState = cookieToInitialState(
    getConfig(),
    headers().get('cookie'),
  )
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/basedPixels.png" />
      </head>
      <body className={inter.className}>
        <Providers initialState={initialState}>
          <StyledComponentsRegistry>{props.children}</StyledComponentsRegistry>
        </Providers>
      </body>
    </html>
  )
}
