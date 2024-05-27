import { Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import PropertyCard from '../components/PropertyCard';
import { usePropertyState } from '../atoms';
import axios from 'axios';

const Properties = () => {
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
  return (
    <>
      {loading ? <Typography>Loading</Typography> : (
        <Grid container spacing={2} p={2}>
          {properties.map((data) => (
            <Grid item xs={12} md={4}>
              <PropertyCard data={data} />
            </Grid>
          ))}

        </Grid>)}
    </>
  )
}

export default Properties