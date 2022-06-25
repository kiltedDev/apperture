import { Grid, ImageList, ImageListItem, ImageListItemBar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getRobots } from '../robots.api'
import { Robot } from '../types'
import RobotCard from './RobotCard.component'

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
        <ImageListItem key={robot.id} sx={{backgroundColor: 'white'}}>
          <img
            alt={`${robot.color} robot named ${robot.name}`} src={`https://robohash.org/${robot.id}?size=200x200`} />
        <ImageListItemBar
          title={robot.name}
        />
        </ImageListItem>
      ))}
    </ImageList>
  )
}

export default AllRobots