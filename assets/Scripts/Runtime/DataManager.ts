import { sys, System } from "cc";
import { Singlenton } from "../Base/Singleton";
import { EventEnum, ItemStatusEnum, ItemTypeEnum, SceneEnum, TriggerStatusEnum } from "../Enum"
import EventManager from "./EventManager";



const STORAGE_KEY = 'STORAGE_KEY'

interface IItem{
    type : ItemTypeEnum,
    status : ItemStatusEnum,
}

export default class DataManager extends Singlenton{

    static get Instance(){
        return super.GetInstance<DataManager>();
    }


    private _curItemType : ItemTypeEnum | null = null;
    private _isSelect = false;
    private _mailBoxStatus: TriggerStatusEnum = TriggerStatusEnum.Pending;
    private  _grandmaStatus: TriggerStatusEnum = TriggerStatusEnum.Pending;
    private _doorStatus: TriggerStatusEnum = TriggerStatusEnum.Pending;
    private _grandmaDialogIndex = -1;
    readonly H2AAnswer = [0,1,2,3,4,5,null];
    readonly H2AInitData = [1,0,3,2,5,4,null];
    private _H2AData = [...this.H2AInitData];
    private _curScene: SceneEnum = SceneEnum.H1;
   private _items : Array<IItem> = [
        {type: ItemTypeEnum.Key, status: ItemStatusEnum.Scene},
        {type: ItemTypeEnum.Mail, status: ItemStatusEnum.Disable},
   ]

   get curScene(){
        return this._curScene;
   }

   set curScene(newData){
        this._curScene = newData;
         this.render();
   }

   get doorStatus(){
        return this._doorStatus;
   }

   set doorStatus(newData){
        this._doorStatus = newData;
         this.render();
   }
   

   get curItemType(){
        return this._curItemType;
   }

   set curItemType(newData){
        this._curItemType = newData;
         this.render();
   }


   get isSelect(){
    return this._isSelect;
   }

   set isSelect(newData){
    this._isSelect = newData;
    this.render();
   }

   get mailBoxStatus(){
    return this._mailBoxStatus;
   }

   set mailBoxStatus(newData){
    this._mailBoxStatus = newData;
    this.render();
   }

   get grandmaStatus(){
        return this._grandmaStatus;
   }

   set grandmaStatus(newData){
        this._grandmaStatus = newData;
        this.render();
   }

   get grandmaDialogIndex(){
        return this._grandmaDialogIndex;
   }

   set grandmaDialogIndex(newData){
        this._grandmaDialogIndex = newData;
        this.render();
   }

   get H2AData(){
    return this._H2AData;
   }

   set H2AData(newData){
        this._H2AData = newData;
        this.render();
   }

   get items(){
    return this._items;
   }

   set items(newData:IItem[]){
    this._items = newData;


    this.render();

   }

   render(){
    // 触发渲染
    EventManager.Instance.emit(EventEnum.Render);


    sys.localStorage.setItem(STORAGE_KEY,JSON.stringify({
        curItemType : this._curItemType,
        isSelect : this._isSelect,
        mailBoxStatus : this._mailBoxStatus,
        grandmaStatus : this._grandmaStatus,
        doorStatus : this._doorStatus,
        grandmaDialogIndex : this._grandmaDialogIndex,
        H2AData : this._H2AData,
        curScene : this._curScene,
        items : this._items,
    }))

   }

   restore(){
    const _data = sys.localStorage.getItem(STORAGE_KEY);
    try{
        const data = JSON.parse(_data);
        this.H2AData = data.H2AData;
        this.curItemType = data.curItemType;
        this._isSelect = data.isSelect;
        this.mailBoxStatus = data.mailBoxStatus;
        this.grandmaStatus = data.grandmaStatus;
        this.doorStatus = data.doorStatus;
        this.grandmaDialogIndex = data.grandmaDialogIndex;
        this.curScene = data.curScene;
        this.items = data.items;

    }catch(e){
        this.reset();
    }
   }

   reset(){
         this.curItemType = null;
    this.isSelect = false;
    this.mailBoxStatus = TriggerStatusEnum.Pending;
    this.grandmaStatus = TriggerStatusEnum.Pending;
    this.doorStatus = TriggerStatusEnum.Pending;
    this.grandmaDialogIndex = -1;
    this.H2AData = [...this.H2AInitData];
    this.curScene = SceneEnum.H1;
    this.items= [
        {type: ItemTypeEnum.Key, status: ItemStatusEnum.Scene},
        {type: ItemTypeEnum.Mail, status: ItemStatusEnum.Disable},
   ]

   }

}

