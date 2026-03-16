
import { _decorator, Component, Node } from 'cc';
import { ItemManager } from './ItemManager';
import { ItemStatusEnum, ItemTypeEnum } from '../Enum';
const { ccclass, property } = _decorator;



@ccclass('MailItemManager')
export class MailItemManager extends ItemManager {
        label = "信件";
        type : ItemTypeEnum = ItemTypeEnum.Mail;
}
