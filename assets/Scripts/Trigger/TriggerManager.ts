import { _decorator, Component, Label, Node, Button, Prefab, instantiate } from 'cc';

import { ItemStatusEnum, ItemTypeEnum, TriggerTypeEnum } from '../Enum';
import { RenderManager } from '../Base/RenderManager';
import DataManager from '../Runtime/DataManager';
import { KeyItemManager } from '../Item/KeyItemManager';
import { MailItemManager } from '../Item/MailItemManager';
const { ccclass, property } = _decorator;


 
@ccclass('TriggerManager')
export abstract class TriggerManager extends RenderManager {


    type: TriggerTypeEnum;

    render(){
        
    }

    abstract handleTrigger(): void;

}