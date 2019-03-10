import { DEBUG_LVL } from '../config';

export function debug(...messages: string[]) {
  if (DEBUG_LVL === 'DEBUG') {
    console.log(...messages);
  }
}

export function info(...messages: string[]) {
  if (DEBUG_LVL === 'DEBUG' || DEBUG_LVL === 'INFO') {
    console.log(...messages);
  }
}

export function error(...messages: string[]) {
  if (DEBUG_LVL === 'DEBUG' || DEBUG_LVL === 'INFO' || DEBUG_LVL === 'ERROR') {
    console.error(...messages);
  }
}
