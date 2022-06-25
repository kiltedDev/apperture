import { Box, ImageList, ImageListItem, ImageListItemBar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getRobots } from '../robots.api'
import { Robot } from '../types'

export interface IAllRobot {

}

export const AllRobots = (props: IAllRobot) => {
  const [robots, setRobots] = useState<Array<Robot>>([])
  
  useEffect(() => {
      const getRobotsResult = getRobots()
      setRobots(getRobotsResult)
  })

  return (
    <ImageList variant="woven" cols={4} gap={8}>
      {robots.map((robot) => (
        <Link to={`robot/${robot.id}`}>
          <ImageListItem key={robot.id} sx={{backgroundColor: 'white'}}>
            <img
              alt={`${robot.color} robot named ${robot.name}`}
              src={`https://robohash.org/${robot.id}?size=200x200`}
              loading="lazy"
              />
          <ImageListItemBar
            title={robot.name}
          />
          </ImageListItem>
        </Link>
      ))}
      <Link to="robot/new">
        <ImageListItem key="new-robot" sx={{bgcolor: 'white'}}>
          <Box sx={{height: '200px', width: '200px'}}>
            <Typography variant="h1">?</Typography>
          </Box>
          <ImageListItemBar
            title="New Robot"
          />
        </ImageListItem>
      </Link>
    </ImageList>
  )
}

export default AllRobots