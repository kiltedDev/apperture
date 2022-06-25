import {  Button, FormControl, Grid, Paper, TextField, Typography } from '@mui/material';
import React  from 'react'
import { Controller, useForm } from "react-hook-form";
import { postRobot } from '../robots.api';
import { Robot } from '../types';

export const NewRobot = () => {
  const { handleSubmit, reset, control } = useForm();

  const handleRobotSave = async (data: unknown) => {
    console.log('click')
    try {
       await postRobot(data as Omit<Robot, 'id'>)
      console.log('woo')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Paper sx={{width: '1200px', maxWidth: '100vw', minHeight: '100vh'}}>
      <Typography variant="h3" component="h1" pb={4}>New Robot</Typography>
      <FormControl sx={{width: '600px', maxWidth: '100vw'}} >
        <Grid container>

          <Grid item py={1} xs={12} md={6}>
            <Controller
              name={"name"}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField onChange={onChange} value={value} label="Robot Name" />
              )}
            />
          </Grid>
          <Grid item py={1} xs={12} md={6}>
          <Controller
            name={"color"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField onChange={onChange} value={value} label="Color" />
              )}
              />
          </Grid>
          <Grid item py={1} xs={12} md={6}>
          <Controller
            name={"attack"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField onChange={onChange} value={value} label="Attack Value" />
            )}
          />
          </Grid>
          <Grid item py={1} xs={12} md={6}>
            <Controller
              name={"defense"}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField onChange={onChange} value={value} label="Defense Value" />
              )}
            />
          </Grid>
          <Grid item py={1} xs={12} md={6}>
            <Button onClick={handleSubmit(handleRobotSave)}>Submit</Button>
          </Grid>
          <Grid item py={1} xs={12} md={6}>
            <Button onClick={() => reset()} variant={"outlined"}>Reset</Button>
          </Grid>
        </Grid>
      </FormControl>
    </Paper>
  )
}

export default NewRobot