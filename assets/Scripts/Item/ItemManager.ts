
import { _decorator, Component, Node, Sprite, SpriteFrame } from 'cc';
import { ItemStatusEnum, ItemTypeEnum } from '../Enum';
import DataManager from '../Runtime/DataManager';
import { RenderManager } from '../Base/RenderManager';
const { ccclass, property } = _decorator;


 
@ccclass('ItemManager')
export class ItemManager extends RenderManager {
    label = "物品";
   status : ItemStatusEnum;
   type : ItemTypeEnum;

   @property(SpriteFrame)
   sceneSf : SpriteFrame = null;
   @property(SpriteFrame)
   inventorySf : SpriteFrame = null;

   start(){
    // 子类方法会覆盖父类方法,防止父类方法不执行 
        super.start();
        this.node.on(Node.EventType.TOUCH_END,this.touchEnd,this);
   }

    onDestroy(){
        super.onDestroy();
       this.node.off(Node.EventType.TOUCH_END,this.touchEnd,this);
   }

   touchEnd(){

        const item = DataManager.Instance.items.find(i=>i.type === this.type);

        if(!item){
            return;
        }

        if(item.status === ItemStatusEnum.Scene){
            item.status = ItemStatusEnum.Inventory;
            // 复制数组，触发数据更新 / UI刷新
            DataManager.Instance.items = [...DataManager.Instance.items];
        }

   }

    render() {
       const status = DataManager.Instance.items.find(i=>i.type === this.type)?.status;
       const spriteComponent = this.getComponent(Sprite)
       switch(status){
            case ItemStatusEnum.Scene:
                this.node.active = true;
                spriteComponent.spriteFrame = this.sceneSf;
                break;
            case ItemStatusEnum.Inventory:
                this.node.active = true;
                spriteComponent.spriteFrame = this.inventorySf;
                break;
            case ItemStatusEnum.Disable:
                this.node.active = false;
                break;
            default:
                break;
       }
   }
}

