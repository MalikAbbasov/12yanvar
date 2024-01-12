import React from 'react'
import Fetchsection from '../../components/Fetchsection'
import { Helmet } from 'react-helmet'

function Home() {
  return (
    <>
    <Helmet><title>Home</title></Helmet>
      <Fetchsection/>
    </>
  )
}

export default Home