'use client'

import React, { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode
}) {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet())

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement()
    // Typings for `styledComponentsStyleSheet.instance` might be incomplete,
    // leading to a type error for `clearTag`. Casting to `any` is a common
    // workaround if strictly typed access isn't straightforward.
    // However, `clearTag` is a method on the `StyleSheet` instance.
    try {
      (styledComponentsStyleSheet.instance as any).clearTag()
    } catch (e) {
      // Fallback or logging if clearTag is not available or causes an error
      // console.error("Failed to clear styled-components tag:", e);
    }
    return <>{styles}</>
  })

  if (typeof window !== 'undefined') {
    // On the client side, render children directly.
    // Styles are expected to be managed by the client-side runtime of styled-components.
    return <>{children}</>
  }

  // On the server side, wrap children with StyleSheetManager to collect styles.
  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  )
} 