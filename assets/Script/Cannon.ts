import Vec2 = cc.Vec2;
import {getDegreeByDirection} from "../Utils/getDegreeByDirection";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Cannon extends cc.Component {

    @property({tooltip: "自動模式"})
    autoMode: boolean = false;

    @property({tooltip: "鎖定模式"})
    focusMode: boolean = false;

    @property({tooltip: "最大子彈數"})
    maxExistBullet: number = 0;

    @property({type: cc.Node, tooltip: "準心"})
    public sniperTarget: cc.Node = null;

    @property({type: cc.Prefab, tooltip: "預設子彈"})
    public bulletPrefab: cc.Prefab = null;

    private autoAttackTimer;

    public fire() {
        if (cc.Canvas.instance.node.children.filter((i) => i.name === this.bulletPrefab.name).length < this.maxExistBullet) {
            const targetLocation = this.sniperTarget.getPosition();
            const cannonPos = this.getWorldLocation(this.node.getPosition());
            const bulletNode = cc.instantiate(this.bulletPrefab);
            cc.find("Canvas").addChild(bulletNode);

            bulletNode.setPosition(cc.v2(this.node.getParent().getPosition().x, this.node.getParent().getPosition().y));
            bulletNode.setSiblingIndex(6);

            const direction = targetLocation.sub(cannonPos).normalize();
            this.node.angle = getDegreeByDirection(direction) - 90;

            bulletNode.getComponent("Bullet").shootTo(direction);
        }
    }

    public startAutoAttack() {
        this.autoMode = true;
        this.fire();
        this.autoAttackTimer = setInterval(this.fire.bind(this), 300);
    }

    public stopAutoAttack() {
        this.autoMode = false;
        clearInterval(this.autoAttackTimer);
    }

    private getWorldLocation(position?: Vec2): Vec2 {
        return this.node.getParent().convertToWorldSpaceAR(position);
    }
}
