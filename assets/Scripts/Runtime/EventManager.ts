import { Singlenton } from "../Base/Singleton";
import { ItemStatusEnum, ItemTypeEnum } from "../Enum"


interface IItem{
    func:Function,
    ctx:unknown
}

export default class EventManager extends Singlenton{

    static get Instance(){
        return super.GetInstance<EventManager>();
    }

    // 每个事件都有一个与之对应的函数数组

    private eventDic: Map<string,Array<IItem>> = new Map();


    // 注册事件：如果事件字典里存在这个事件了，那就新加一个函数func,如果不存在这个事件，那就添加新的键值对
    on(eventName:string,func:Function,ctx?:unknown) {
        if(this.eventDic.has(eventName)){
            this.eventDic.get(eventName).push({func,ctx});
        }
        else{
            this.eventDic.set(eventName,[{func,ctx}]);
        }
    }

    // eventName 这个事件 不再执行 func 这个函数
    off(eventName:string,func:Function,ctx?:unknown){
        if(this.eventDic.has(eventName)){
            // findIndex 找不到时返回 -1
            const index = this.eventDic.get(eventName).findIndex(i=>i.func === func && i.ctx === ctx);
            // &&是简写的 if。等价于 if(index > -1){this.eventDic.get(eventName).splice(index,1);}
            index > -1 && this.eventDic.get(eventName).splice(index,1);
        
        }
    }

    // 执行某个事件注册的所有回调函数
    emit(eventName:string,...params:unknown[]){
        if(this.eventDic.has(eventName)){
            this.eventDic.get(eventName).forEach(({func,ctx})=> {
                ctx? func.apply(ctx,params) :func(...params)
            })
        }
    }

    clear(){
        this.eventDic.clear();
    }

   
}

