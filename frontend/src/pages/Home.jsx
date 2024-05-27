import { Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import PropertyCard from '../components/PropertyCard';
import { usePropertyState } from '../atoms';
import axios from 'axios';
import Hero from './Hero';
import Properties from '../components/Properties';

const Home = () => {
  const [properties, setProperties] = usePropertyState()
  const [loading, setLoading] = useState(true)

  // const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/api/properties").then(res => {
      // console.log(res.data.properties)
      setProperties(res.data.properties)
      setLoading(false)
    }).catch(err => console.log(err))
  }, [])

  // console.log("properties", properties)
  return (
    <>
      <Hero/>
      <Properties />
    </>
  )
}

export default Home