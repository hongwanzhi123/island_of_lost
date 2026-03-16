
import { _decorator, Component, Label, Node, Button, Prefab, instantiate } from 'cc';

import { ItemStatusEnum, ItemTypeEnum } from '../Enum';
import { RenderManager } from '../Base/RenderManager';
import DataManager from '../Runtime/DataManager';
import { KeyItemManager } from '../Item/KeyItemManager';
import { MailItemManager } from '../Item/MailItemManager';
const { ccclass, property } = _decorator;


 
@ccclass('InventoryManager')
export class InventoryManager extends RenderManager {

    @property(Prefab)
    keyPrefab: Prefab = null;

    @property(Prefab) 
    mailPrefab: Prefab = null;
    
    @property(Label)
    label: Label = null;

    @property(Button)
    leftButton: Button = null;

    @property(Button)
    rightButton: Button = null;

    @property(Node)
    placeHolder: Node = null;

    @property(Node)
    hand: Node = null;

    
    render(){
        this.placeHolder.destroyAllChildren();
        const isInventoryItems = DataManager.Instance.items.filter(i=>i.status === ItemStatusEnum.Inventory)
        this.node.active = (isInventoryItems.length > 0);
        
        if(isInventoryItems.length > 0){
            // 是否有当前选中物品
            if(DataManager.Instance.curItemType){
                const item = DataManager.Instance.items.find(i=> i.type === DataManager.Instance.curItemType)
                // 当前物品还在背包
                if(item.status === ItemStatusEnum.Inventory){
                    this.generateItem(DataManager.Instance.curItemType);
                }else{
                    // 钥匙已经使用, 选择背包第一个物品,更新 DataManager.Instance.curItemType
                    const type = isInventoryItems[0].type;
                    this.generateItem(type);
                    DataManager.Instance.curItemType = type;
                }
            }
        else{
            const type = isInventoryItems[0].type;
            this.generateItem(type);
            DataManager.Instance.curItemType = type;

        }
    }

        this.hand.active = Boolean(DataManager.Instance.curItemType) && DataManager.Instance.isSelect;
        this.changeButtonInteractable();
    }

    // 根据物品类型生成UI
    generateItem(type:ItemTypeEnum){
        switch(type){
            case ItemTypeEnum.Key:
                const keyNode = instantiate(this.keyPrefab);
                this.placeHolder.addChild(keyNode);
                this.label.string = keyNode.getComponent(KeyItemManager).label;
                break;
            case ItemTypeEnum.Mail:
                const mailNode = instantiate(this.mailPrefab);
                this.placeHolder.addChild(mailNode);
                this.label.string = mailNode.getComponent(MailItemManager).label;
                break;
            default:
                break;
        }
    }

    handSelect(){
        DataManager.Instance.isSelect = !DataManager.Instance.isSelect;
    }

    handLeftButton(){
        if(DataManager.Instance.curItemType === null){
            return;
        }

        const isInventoryItems = DataManager.Instance.items.filter(i=>i.status === ItemStatusEnum.Inventory);
        const index = isInventoryItems.findIndex(i=>i.type === DataManager.Instance.curItemType);
        if(index > 0){
            DataManager.Instance.isSelect = false;
            DataManager.Instance.curItemType = isInventoryItems[index-1].type;
        }
    }

    handRightButton(){
        if(DataManager.Instance.curItemType === null){
            return;
        }

        const isInventoryItems = DataManager.Instance.items.filter(i=>i.status === ItemStatusEnum.Inventory);
        const index = isInventoryItems.findIndex(i=>i.type === DataManager.Instance.curItemType);
        if(index < isInventoryItems.length-1){
            DataManager.Instance.isSelect = false;
            DataManager.Instance.curItemType = isInventoryItems[index+1].type;
        }
    }

    changeButtonInteractable(){
        if(DataManager.Instance.curItemType === null)
        {this.leftButton.interactable = false;
        this.rightButton.interactable = false;
        return;
    }
         const isInventoryItems = DataManager.Instance.items.filter(i=>i.status === ItemStatusEnum.Inventory);
        const index = isInventoryItems.findIndex(i=>i.type === DataManager.Instance.curItemType);
        this.leftButton.interactable = (index > 0);
        this.rightButton.interactable = (index < isInventoryItems.length -1);

    }
  
}

