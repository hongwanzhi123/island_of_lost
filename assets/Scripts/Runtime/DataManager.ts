import { Singlenton } from "../Base/Singleton";
import { EventEnum, ItemStatusEnum, ItemTypeEnum, TriggerStatusEnum } from "../Enum"
import EventManager from "./EventManager";


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
    private _grandmaDialogIndex = -1;
   private _items : Array<IItem> = [
        {type: ItemTypeEnum.Key, status: ItemStatusEnum.Scene},
        {type: ItemTypeEnum.Mail, status: ItemStatusEnum.Disable},
   ]

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
   }

}

