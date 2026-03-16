
import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
import { SceneManager } from './SceneManager';
import DataManager from '../Runtime/DataManager';
import { ItemStatusEnum, ItemTypeEnum } from '../Enum';
const { ccclass, property } = _decorator;


 
@ccclass('H2SceneManager')
export class H2SceneManager extends SceneManager{
    
    @property(Node)
    keyPlaceHolder: Node = null;
    @property(Prefab)
    keyPrefab: Prefab = null;

    render(){
        super.render();
        this.items.destroyAllChildren();

        const key = DataManager.Instance.items.find(i=> i.type === ItemTypeEnum.Key);
        if(key && key.status === ItemStatusEnum.Scene){
            const keyNode = instantiate(this.keyPrefab);
            this.items.addChild(keyNode);
            keyNode.setPosition(this.keyPlaceHolder.position);
        }
    }
}


