
import { _decorator, Component, director, instantiate, Node, Prefab } from 'cc';
import { SceneEnum } from '../Enum';
import { RenderManager } from '../Base/RenderManager';
import DataManager from '../Runtime/DataManager';
const { ccclass, property } = _decorator;


 
@ccclass('SceneManager')
export class SceneManager extends RenderManager {

    // 专门用来管理“场景物品”的容器节点, 集中管理场景里的所有物品
    @property(Node)
    items: Node = null;

    @property(Prefab)
    inventoryPrefab: Prefab = null;

    type:SceneEnum;


    start(){
        super.start();
        director.preloadScene(SceneEnum.H1);
        director.preloadScene(SceneEnum.H2);
        director.preloadScene(SceneEnum.H3);
        director.preloadScene(SceneEnum.H4);

        if(this.inventoryPrefab){
            const inventory = instantiate(this.inventoryPrefab);
            this.node.addChild(inventory);
        }

    }
    
    changeScene(e:Event, Scene:string){

        DataManager.Instance.curScene = Scene as SceneEnum;
        // director.loadScene(Scene as SceneEnum);

    }

    render() {
        if(DataManager.Instance.curScene === this.type){
            return;
        }

        director.loadScene(DataManager.Instance.curScene);
    }
}

