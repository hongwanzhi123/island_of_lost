import { _decorator, Component, Label, Node, Button, Prefab, instantiate } from 'cc';

import { ItemStatusEnum, ItemTypeEnum, TriggerStatusEnum, TriggerTypeEnum } from '../Enum';
import { RenderManager } from '../Base/RenderManager';
import DataManager from '../Runtime/DataManager';
import { KeyItemManager } from '../Item/KeyItemManager';
import { MailItemManager } from '../Item/MailItemManager';
import { TriggerManager } from './TriggerManager';
const { ccclass, property } = _decorator;


 
@ccclass('MailBoxTriggerManager')
export class MailBoxTriggerManager extends TriggerManager {


    type: TriggerTypeEnum = TriggerTypeEnum.MailBox;

    @property(Node)
    closeNode: Node = null;

    @property(Node)
    openNode: Node = null;


    render(){
        super.render();
        const open = DataManager.Instance.mailBoxStatus === TriggerStatusEnum.Resolved;
        this.closeNode.active = !open;
        this.openNode.active = open;
    }

    handleTrigger(): void {
        if(DataManager.Instance.curItemType === ItemTypeEnum.Key && DataManager.Instance.isSelect){

            DataManager.Instance.items.find(i=> i.type === ItemTypeEnum.Key).status = ItemStatusEnum.Disable;
            DataManager.Instance.isSelect = false;
            DataManager.Instance.curItemType = null;
            DataManager.Instance.items.find(i=> i.type === ItemTypeEnum.Mail).status = ItemStatusEnum.Scene;
            DataManager.Instance.items = [...DataManager.Instance.items];

            DataManager.Instance.mailBoxStatus = TriggerStatusEnum.Resolved;
        }
    }

}