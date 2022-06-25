import robots from './robots.json'
import { Robot } from './types'

export function getRobots(): Robot[] {
    return robots
}