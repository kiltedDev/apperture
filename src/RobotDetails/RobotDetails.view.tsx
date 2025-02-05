import { Avatar, Card, CardContent, CardHeader, CardMedia, Grid, IconButton,  Skeleton, Typography } from '@mui/material'
import { DeleteForever } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteRobot, getRobots } from '../robots.api'
import { Robot } from '../types'

export const RobotDetails = () => {
  const { robotId } = useParams();
  const [thisRobot, setThisRobot] = useState<Robot|undefined>(undefined);
  const navigate = useNavigate()

  useEffect(() => {
    const robots = getRobots();
    setThisRobot(robots.find(robot => robot.id === robotId));
  }, [robotId])
    
  if (!thisRobot) return <Skeleton animation="wave" variant="rectangular" width={450} height={250} />

  const handleRobotDelete = async () => {
    try {
      await deleteRobot(thisRobot.id)
      console.log('deleted')
      
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{bgcolor: thisRobot.color}} aria-label="robot">
            {thisRobot.name.charAt(0)}
          </Avatar>
        }
        title={<Typography variant="h3">
          {thisRobot.name}
        </Typography>
      }
      />
      <CardMedia
        component="img"
        height="333"
        src={`https://robohash.org/${thisRobot.id}?size=500x500`}
        alt={`${thisRobot.color} robot named ${thisRobot.name}`}
      />
      <CardContent>
        <Grid container>
          <Grid item xs={10} alignContent="flex-start">
            <Typography>{`Attack: ${thisRobot.attack}`}</Typography>
            <Typography>{`Defense: ${thisRobot.defense}`}</Typography>
          </Grid>
          <Grid item xs={2}>
            <IconButton onClick={handleRobotDelete} >
              <DeleteForever sx={{fontSize: 40 }} color="error" />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default RobotDetails
