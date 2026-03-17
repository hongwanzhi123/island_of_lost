import { _decorator, Component, Label, Node, Button, Prefab, instantiate, Sprite, director } from 'cc';
import { ItemStatusEnum, ItemTypeEnum, SceneEnum, TriggerStatusEnum, TriggerTypeEnum } from '../Enum';
import DataManager from '../Runtime/DataManager';
import { TriggerManager } from './TriggerManager';
const { ccclass, property } = _decorator;


 
@ccclass('DoorTriggerManager')
export class DoorTriggerManager extends TriggerManager {



    render(){
        super.render();
        
        if(DataManager.Instance.doorStatus === TriggerStatusEnum.Pending){
           this.getComponent(Sprite).enabled = true;
        }else if(DataManager.Instance.doorStatus === TriggerStatusEnum.Resolved){
            this.getComponent(Sprite).enabled = false;
        }

        
    }

    handleTrigger(){
        if(DataManager.Instance.doorStatus === TriggerStatusEnum.Pending){
            
            DataManager.Instance.curScene = SceneEnum.H2A;
        }else{
           
            DataManager.Instance.curScene = SceneEnum.H3;
        }
        
    }

}