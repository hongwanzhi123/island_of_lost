

import { _decorator, Component, director, instantiate, isCustomTargetModifier, Node, Prefab, Sprite, SpriteFrame, UITransform } from 'cc';
import { ItemStatusEnum, ItemTypeEnum, SceneEnum, TriggerStatusEnum } from '../Enum';
import { CircleManager } from './CircleManager';
import { RenderManager } from '../Base/RenderManager';
import DataManager from '../Runtime/DataManager';
const { ccclass, property } = _decorator;


const CIRCLE_RADIUS = 46; 

@ccclass('H2AGameManager')
export class H2AGameManager extends RenderManager {
    
   @property([CircleManager])
   circles: CircleManager[] = []

   @property(Node)
   lines: Node = null;

   @property(Prefab)
   line: Prefab = null;

   @property([Prefab])
   contentPrefab: Prefab[] = [];

   private _circleMap:Map<CircleManager,CircleManager[]> = new Map();

   start(){
    super.start();

    this.generateCircleMap();
    this.generateCircleLines();
     this.checkSuccess();
   }

   render(){
       for(let i = 0; i < this.circles.length; i++){
            const circle = this.circles[i];
            circle.node.destroyAllChildren();

            const contentIndex = DataManager.Instance.H2AData[i];
            if(contentIndex != null && this.contentPrefab[contentIndex]){
                const content = instantiate(this.contentPrefab[contentIndex]);
                circle.node.addChild(content);
            }
       }

     
   }

   handleCircleTouch(event:Event,_index:string){

        if(DataManager.Instance.H2AData.every((e,i)=>DataManager.Instance.H2AAnswer[i]===e)){
            return;
        }
        const index = parseInt(_index);
        const curCircleContentIndex = DataManager.Instance.H2AData[index];
        if(curCircleContentIndex === null){
            return;
        }
        const curCircle = this.circles[index];
        const circles = this._circleMap.get(curCircle);
        for(let i=0; i<circles.length;i++){
            const circle = circles[i];

            const nullIndex = DataManager.Instance.H2AData.findIndex(i=> i === null);
            const circleIndex = this.circles.findIndex(i=> i === circle);

            if(nullIndex === circleIndex){
                DataManager.Instance.H2AData[circle.index] = curCircleContentIndex;
                DataManager.Instance.H2AData[index] = null;
                DataManager.Instance.H2AData = [...DataManager.Instance.H2AData];

            }

        }
        this.checkSuccess();
        console.log(DataManager.Instance.H2AData);


   }

   checkSuccess(){
        if(DataManager.Instance.H2AData.every((e,i)=>DataManager.Instance.H2AAnswer[i]===e)){
            DataManager.Instance.doorStatus = TriggerStatusEnum.Resolved;
        
            DataManager.Instance.curScene = SceneEnum.H2;
        }
   }

   resetContent(){
        DataManager.Instance.H2AData = [...DataManager.Instance.H2AInitData];
   }

   generateCircleMap(){
        this._circleMap.set(this.circles[0],[this.circles[1],this.circles[4],this.circles[6]]);
        this._circleMap.set(this.circles[1],[this.circles[0],this.circles[5],this.circles[6]]);
        this._circleMap.set(this.circles[2],[this.circles[4],this.circles[6]]);
        this._circleMap.set(this.circles[3],[this.circles[5],this.circles[6]]);
        this._circleMap.set(this.circles[4],[this.circles[0],this.circles[2],this.circles[5],this.circles[6]]);
        this._circleMap.set(this.circles[5],[this.circles[1],this.circles[3],this.circles[4],this.circles[6]]);
        this._circleMap.set(this.circles[6],[this.circles[0],this.circles[1],this.circles[2],this.circles[3],this.circles[4],this.circles[5]]);

        for(let i=0; i<this.circles.length; i++){
            const circle = this.circles[i];
            circle.index = i;
        }

   }

   generateCircleLines(){
    for (const [curCircle,circles] of this._circleMap) {
        for (const nextCircle of circles) {
            const curCircleIndex = this.circles.findIndex(i=> i === curCircle);
            const nextCircleIndex = this.circles.findIndex(i=> i === nextCircle);
            if(curCircleIndex < nextCircleIndex){
                this.generateCircleLine(curCircle, nextCircle);
            }
        
        }
    }
   }

   generateCircleLine(curCircle:CircleManager, nextCircle:CircleManager){
         const line = instantiate(this.line);
         this.lines.addChild(line);

        const{x:x1, y:y1} = curCircle.node.position;
        const{x:x2, y:y2} = nextCircle.node.position;

        const x = (x1 + x2)/2;
        const y = (y1 + y2)/2;

        line.setPosition(x, y);

        const side1 = Math.abs(x1 - x2);
        const side2 = Math.abs(y1 - y2);
        const side3 = Math.sqrt(side1 **2 + side2 **2);


        const uiTransform = line.getComponent(UITransform);
        uiTransform.setContentSize(side3 - 2*CIRCLE_RADIUS,uiTransform.contentSize.height);
        

        const rad = Math.atan(side2 / side1);
        const angle = rad * 180 / Math.PI;
        const sign = (x1 > x2 && y1 > y2) || (x1 < x2 && y1 < y2) ? 1 : -1;

        line.setRotationFromEuler(0,0,sign * angle);

       

   }
  
}

