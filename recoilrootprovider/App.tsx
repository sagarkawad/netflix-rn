import React from 'react'
import { RecoilRoot } from 'recoil'

const App = ({children}: any) => {
  return (
    <RecoilRoot>{children}</RecoilRoot>
  )
}

export default App