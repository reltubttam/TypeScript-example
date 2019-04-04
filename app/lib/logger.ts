import { LOG_LVL } from '../config';

export function debug(...messages: string[]) {
  if (LOG_LVL === 'DEBUG') {
    console.log(...messages);
  }
}

export function info(...messages: string[]) {
  if (LOG_LVL === 'DEBUG' || LOG_LVL === 'INFO') {
    console.log(...messages);
  }
}

export function error(...messages: string[]) {
  if (LOG_LVL === 'DEBUG' || LOG_LVL === 'INFO' || LOG_LVL === 'ERROR') {
    console.error(...messages);
  }
}
