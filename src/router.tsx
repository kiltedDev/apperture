import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AllRobots from './AllRobots/AllRobots.view'
import NewRobot from './NewRobot/NewRobot.view'
import RobotDetails from './RobotDetails/RobotDetails.view'
import SquareCircle from './SquareCircle/SquareCircle'

export const Router = () => {
  return (
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<AllRobots />} />
        <Route path="robots" element={<AllRobots />} />
        <Route path="robot/new" element={<NewRobot />} />
        <Route path="robot/:robotId" element={<RobotDetails />} />
        <Route path="square_circle" element={<SquareCircle />} />
    </Routes>
  </BrowserRouter>  )
}

export default Router