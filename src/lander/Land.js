import React from 'react'
import Menu from './Menu'
import Opening from './Opening'
import Points from './Points'
import Prices from './Prices'
import SoNow from './SoNow'
import Bottom from './Bottom'
import Gallery from './Gallery'

export default function Land() {
  return (
    <div>
      <Menu />
      <Opening />
      <Points />
      <Gallery />
      <SoNow />
      <Prices />
      <Bottom />
    </div>
  )
}
