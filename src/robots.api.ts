import { v4 as uuidv4 } from 'uuid';
import robots from './robots.json';
import { Robot } from './types';

export function getRobots(): Robot[] {
  return robots
}

export function deleteRobot(robotId: string): Promise<void> {
  console.log(`deleted robot with id ${robotId}`)
  return Promise.resolve()
}

export function postRobot(newRobot: Omit<Robot, 'id'>): Promise<Robot> {
    const savedRobot = {
      ...newRobot,
      id: uuidv4(),
    }

    const savedRobots = [
      ...robots,
      savedRobot
    ]

    console.log(savedRobots)

    return Promise.resolve(savedRobot)
}