import { Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'

import PropertyCard from '../components/PropertyCard';
import { useProperties } from '../atoms';
import { useRecoilValue } from 'recoil';
import PropertiesData from '../components/PropertiesData';

const Properties = () => {
  // const data = useProperties()

  // console.log("data", data)
  return (
    <>
      <Grid container spacing={2} p={2}>
        <PropertiesData />
      </Grid>
    </>
  )
}


export default Properties