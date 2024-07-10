'use client'

import React, { FC, useEffect, useState } from 'react'

type TClientPageProps = {
  serverData: {
    someData: string
  }
}

// This function will be executed firstly on the server side
// It will ignore all dynamic logic that works in the browser (like useEffect, useLayoutEffect and etc.)
// And just will return the html with rendered data (including initial state of `useState`, and `useRef`, if we would use that)
export const ClientPage: FC<TClientPageProps> = ({ serverData }) => {
  // first we will get `server state` in the server and browser and as an initial state
  const [state, setState] = useState('server state')
  
  console.log("This log will be shown in the server logs on component's first mount and browsers on all mounts")

  useEffect(() => {
    // that won't be called on the server side
    // it will be changed only when the component will be mounted in the browser
    setState('browser state')
  }, [])

  return (
    <main>
      <div>State is: {state}</div>
      <div>Server data is: {serverData.someData}</div>
    </main>
  )
}