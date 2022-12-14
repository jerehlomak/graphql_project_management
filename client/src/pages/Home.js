import React from 'react'
import AddClient from '../components/AddClient'
import Projects from '../components/Projects'
import Clients from '../components/Clients'
import AddProject from '../components/AddProject'

const Home = () => {
  return (
    <>
        <div className='d-flex w-100 gap-3 mb-4'>
            <AddClient />
            <AddProject />
        </div>
        <Projects />
        <hr />
        <Clients />
    </>
  )
}

export default Home