import { Avatar, Card, CardContent, CardHeader, CardMedia, Paper, Skeleton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getRobots } from '../robots.api'
import { Robot } from '../types'

export const RobotDetails = () => {
  const { robotId } = useParams()
  const [thisRobot, setThisRobot] = useState<Robot|undefined>(undefined)

  useEffect(() => {
    const robots = getRobots()
    setThisRobot(robots.find(robot => robot.id === robotId))
  }, [robotId])
    
  if (!thisRobot) return <Skeleton animation="wave" variant="rectangular" width={450} height={250} />
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
        <Typography>{`Attack: ${thisRobot.attack}`}</Typography>
        <Typography>{`Defense: ${thisRobot.defense}`}</Typography>
      </CardContent>
    </Card>
  )
}

export default RobotDetails
