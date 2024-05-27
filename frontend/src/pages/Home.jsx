import { Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'


import Hero from './Hero';
;
import PropertiesData from '../components/PropertiesData';

const Home = () => {
  return (
    <>
      <Hero />
      <PropertiesData />
    </>
  )
}

export default Home