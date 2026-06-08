import { PlayerConfig } from '../types';

export interface PlayerRegistryItem {
  instance: any;
  Player: any;
  videoid: string;
  id: string;
  player_id: string;
}

type PlayerRegistryWindow = Window & {
  PLAYER_MODULE_ALL_PLATLIST?: PlayerRegistryItem[];
};

export function addGlobalPlayer(instance: any, player: any, config: PlayerConfig): void {
  const registryWindow = window as PlayerRegistryWindow;

  if(registryWindow.PLAYER_MODULE_ALL_PLATLIST === undefined){
    registryWindow.PLAYER_MODULE_ALL_PLATLIST = [];
  }

  registryWindow.PLAYER_MODULE_ALL_PLATLIST.push({
    instance: instance,
    Player: player,
    videoid: config.videoid,
    id: config.id,
    player_id: config.player_id
  });
}

export function pauseAllPlayers(): void {
  const registryWindow = window as PlayerRegistryWindow;

  registryWindow.PLAYER_MODULE_ALL_PLATLIST!.map((item: PlayerRegistryItem)=>{
    item.instance.Pause();
  });
}

export function pauseOtherPlayers(activePlayerId: string): void {
  const registryWindow = window as PlayerRegistryWindow;

  registryWindow.PLAYER_MODULE_ALL_PLATLIST?.forEach((item: PlayerRegistryItem)=>{
    if(item.player_id !== activePlayerId && !item.Player.paused()){
      item.instance.Pause();
    }
  });
}

export function stopAllPlayers(): void {
  const registryWindow = window as PlayerRegistryWindow;

  registryWindow.PLAYER_MODULE_ALL_PLATLIST!.map((item: PlayerRegistryItem)=>{
    item.instance.Stop();
  });
}
