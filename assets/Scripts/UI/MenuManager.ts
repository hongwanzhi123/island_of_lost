
import { _decorator, Component, Label, Node, Button, Prefab, instantiate, director } from 'cc';

import { ItemStatusEnum, ItemTypeEnum, SceneEnum } from '../Enum';
import { RenderManager } from '../Base/RenderManager';
import DataManager from '../Runtime/DataManager';
import { KeyItemManager } from '../Item/KeyItemManager';
import { MailItemManager } from '../Item/MailItemManager';
const { ccclass, property } = _decorator;


 
@ccclass('MenuManager')
export class MenuManager extends RenderManager {

    
  handleReturnMenu(){
    director.loadScene(SceneEnum.Menu);
  }  

  render(){
      
  }
}

