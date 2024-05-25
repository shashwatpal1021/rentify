import { Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'

import PropertyCard from '../components/PropertyCard';
import {  useProperties } from '../atoms';
import { useRecoilValue } from 'recoil';

const Properties = () => {
  const data = useProperties()

  // console.log("data", data)
  return (
    <>
      <Grid container spacing={2} p={2}>
        {data.map((data) => (
          <Grid item xs={12} md={4}>
            <PropertyCard data={data} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}


export default Properties