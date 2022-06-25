import { Box, Button, Grid, MenuItem, Paper, Select, SelectChangeEvent, Typography } from '@mui/material'
import {  Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { getRobots } from '../robots.api'
import { Robot } from '../types'

export interface ISquareCircle {

}

type Round = {
  roundNumber: number
  damageOnFirst: number
  damageOnSecond: number
}

export const SquareCircle = (props: ISquareCircle) => {
  const [firstContender, setFirstContender] = useState<Robot|null>(null)
  const [secondContender, setSecondContender] = useState<Robot|null>(null)
  const [robots, setRobots] = useState<Array<Robot>>([])
  const [results, setResults] = useState<Array<Round>>([])
  const [winner, setWinner] = useState('')
  
  useEffect(() => {
      const getRobotsResult = getRobots()
      setRobots(getRobotsResult)
  })

  const handleFirstContenderSelect = (event: SelectChangeEvent<string>) => {
    const contenderId = (event).target.value
    setFirstContender(robots.find((robot) => robot.id === contenderId ) ?? null)
  }

  const handleSecondContenderSelect = (event: SelectChangeEvent<string>) => {
    const contenderId = (event ).target.value
    setSecondContender(robots.find((robot) => robot.id === contenderId ) ?? null)
  }

  const runFight = (first:number, second:number) => {
    if (!firstContender || !secondContender) return
    const firstAttack = Math.max(Math.floor(Math.random() * 10) + firstContender?.attack - secondContender?.defense, 0)
    const secondAttack = Math.max(Math.floor(Math.random() * 10) + secondContender?.attack - firstContender?.defense, 0)
    setResults([
      ...results,
      {
        roundNumber: results.length + 1,
        damageOnFirst: secondAttack,
        damageOnSecond: firstAttack
      }
    ])
    const firstTotal = first + secondAttack
    const secondTotal = second + firstAttack

    if (firstTotal < 50 && secondTotal < 50) {
      runFight(firstTotal, secondTotal)
    } else if (firstTotal > 49 && secondTotal > 49) {
      setWinner('Double KO!')
    } else if (firstTotal > 49) {
      setWinner(secondContender.name)
    } else {
      setWinner(firstContender.name)
    }
  }
  
  return (
    <Container>
      <Typography variant="h3">Welcome to the Square Circle</Typography>
      {winner && <Typography variant="h4">{`Winner: ${winner}`}</Typography>}
      <Grid container>
        <Grid item xs={10}>
          <Paper sx={{height: '800px', width: '800px', position: 'relative'}}>
            {firstContender && (<Box sx={{position: 'absolute', right: 0, top: 0}}>
              <img
                alt={`${firstContender.color} robot named ${firstContender.name}`}
                src={`https://robohash.org/${firstContender.id}?size=200x200`}
                loading="lazy"
              />
            </Box>)}
            {secondContender && (<Box sx={{position: 'absolute', left: 0, bottom: 0}}>
              <img
                alt={`${secondContender.color} robot named ${secondContender.name}`}
                src={`https://robohash.org/${secondContender.id}?size=200x200`}
                loading="lazy"
              />
            </Box>)}
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper sx={{height: '800px'}}>
            <Typography>Results:</Typography>
            {results.map((round) => (

              <>
                <Typography>{`Round ${round.roundNumber}! Fight!`}</Typography>
                <Typography color={firstContender!.color}>{`${firstContender!.name} deals ${round.damageOnSecond} damage!`}</Typography>
                <Typography color={secondContender!.color}>{`${secondContender!.name} deals ${round.damageOnFirst} damage!`}</Typography>
              </>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} pt={2}>
          <Select label="1st Contender" sx={{width: '200px', bgcolor: 'white'}} onChange={handleFirstContenderSelect}>
            {robots.map((robot) => {
              if (robot.id !== secondContender?.id) {
                return (<MenuItem value={robot.id}>{robot.name}</MenuItem>)
              }
              // return <></>
            })}
          </Select>
        </Grid>
        <Grid item xs={12} md={4} pt={2}>
          <Select label="2nd Contender" sx={{width: '200px', bgcolor: 'white'}} onChange={handleSecondContenderSelect} >
            {robots.map((robot) => {
              if (robot.id !== firstContender?.id) {
                return (<MenuItem value={robot.id}>{robot.name}</MenuItem>)
              }
              // return <></>
            })}
          </Select>
        </Grid>
        <Grid item xs={12} md={4} pt={2}>
          <Button variant="outlined" color="error" disabled={!firstContender|| !secondContender} onClick={() => runFight(0,0)}>Fight!</Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default SquareCircle