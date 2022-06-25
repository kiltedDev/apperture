import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AllRobots from './AllRobots/AllRobots.view'
import RobotDetails from './RobotDetails/RobotDetails.view'

export const Router = () => {
  return (
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<AllRobots />} />
        <Route path="robots" element={<AllRobots />} />
        <Route path="robotDetails/:robotId" element={<RobotDetails />} />
    </Routes>
  </BrowserRouter>  )
}

export default Router