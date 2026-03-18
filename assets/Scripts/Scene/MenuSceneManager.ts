
import { _decorator, Component, director, Node } from 'cc';
import { SceneManager } from './SceneManager';
import { SceneEnum } from '../Enum';
import DataManager from '../Runtime/DataManager';
const { ccclass, property } = _decorator;


 
@ccclass('MenuSceneManager')
export class MenuSceneManager extends SceneManager{
   

    handleNewGame(){
        DataManager.Instance.reset();
        director.loadScene(SceneEnum.H1);
    }

    handleContinueGame(){
        DataManager.Instance.restore();
        director.loadScene(DataManager.Instance.curScene);
    }


   render(){
       
   }
}


