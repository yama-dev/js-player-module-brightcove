import { PlayerConfig } from '../types';

export interface PlayerRegistryItem {
  instance: any;
  Player: any;
  videoid: string;
  id: string;
  player_id: string;
}

export function addGlobalPlayer(instance: any, player: any, config: PlayerConfig): void {
  if(window.PLAYER_MODULE_ALL_PLATLIST === undefined){
    window.PLAYER_MODULE_ALL_PLATLIST = [];
  }

  window.PLAYER_MODULE_ALL_PLATLIST.push({
    instance: instance,
    Player: player,
    videoid: config.videoid,
    id: config.id,
    player_id: config.player_id
  });
}

export function pauseAllPlayers(): void {
  window.PLAYER_MODULE_ALL_PLATLIST.map((item: PlayerRegistryItem)=>{
    item.instance.Pause();
  });
}

export function stopAllPlayers(): void {
  window.PLAYER_MODULE_ALL_PLATLIST.map((item: PlayerRegistryItem)=>{
    item.instance.Stop();
  });
}
