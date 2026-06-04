import { parseNumber } from '../utils/number';

export interface PlayerTimeSource {
  currentTime(): number;
  duration(): number;
}

export interface PlayerTimeInfo {
  current: string;
  max: string;
  down: string;
  ratio: number;
  par: string;
}

export function getPlayerTime(player: PlayerTimeSource): string {
  const minutes = parseNumber(Math.floor(player.currentTime() / 60));
  const seconds = parseNumber(Math.floor(player.currentTime() % 60));

  if (isFinite(Number(seconds)) && isFinite(Number(minutes))) return `${minutes}:${seconds}`;
  return '00:00';
}

export function getPlayerTimeDown(player: PlayerTimeSource): string {
  const countDownTime = player.duration() - Math.floor(player.currentTime());
  const minutes = parseNumber(Math.floor(countDownTime / 60));
  const seconds = parseNumber(Math.floor(countDownTime % 60));

  if (isFinite(Number(seconds)) && isFinite(Number(minutes))) return `${minutes}:${seconds}`;
  return '00:00';
}

export function getPlayerTimeMax(player: PlayerTimeSource): string {
  const minutes = parseNumber(Math.floor(player.duration() / 60));
  const seconds = parseNumber(Math.floor(player.duration() % 60));

  return `${minutes}:${seconds}`;
}

export function getPlayerTimeRatio(player: PlayerTimeSource): number {
  return Math.floor(player.currentTime() / player.duration() * 1000) / 1000;
}

export function getPlayerTimePar(player: PlayerTimeSource): string {
  const time = Math.floor(player.currentTime() / player.duration() * 1000) / 10;

  if (isFinite(time)) return `${time}%`;
  return '0%';
}

export function getPlayerTimeInfo(player: PlayerTimeSource): PlayerTimeInfo {
  return {
    current : getPlayerTime(player),
    max     : getPlayerTimeMax(player),
    down    : getPlayerTimeDown(player),
    ratio   : getPlayerTimeRatio(player),
    par     : getPlayerTimePar(player)
  };
}
