import Vec2 = cc.Vec2;

const {ccclass, property} = cc._decorator;

@ccclass
export default class Cannon extends cc.Component {

    @property({tooltip: "鎖定模式"})
    focusMode: boolean = false;

    @property({tooltip: "自動模式"})
    autoMode: boolean = false;

    @property({type: cc.Prefab})
    public bulletPrefab: cc.Prefab = null;

    private onFire: boolean = false;


    public update(dt: number) {
        if (this.autoMode && !this.onFire) {
            this.onFire = true;
            this.schedule(this.fire, 500, cc.macro.REPEAT_FOREVER);
        } else {
            this.onFire = false;
            this.unschedule(this.fire);
        }
    }

    public rotate(angle: number) {
        const rotation = cc.rotateTo(0.1, cc.misc.radiansToDegrees(angle));
        this.node.runAction(rotation);
    }

    public fire() {
        const targetLocation = cc.Canvas.instance.node.getComponent("Game").sniperTarget.getPosition();
        const cannonPos = this.getWorldLocation(this.node.getPosition());
        const bulletNode = cc.instantiate(this.bulletPrefab);
        cc.find("Canvas").addChild(bulletNode);

        bulletNode.setPosition(cc.v2(this.node.getPosition().x, this.node.getPosition().y + 10));
        bulletNode.setSiblingIndex(6);

        const bulletSpeed = bulletNode.getComponent("Bullet").speed;
        const direction = targetLocation.sub(cannonPos).normalize();
        const angle = direction.signAngle(cc.v2(0, 1));
        this.rotate(angle);
        bulletNode.getComponent("Bullet").rotateByAngle(angle);
        bulletNode.getComponent(cc.RigidBody).linearVelocity = cc.v2(direction.x * bulletSpeed, direction.y * bulletSpeed);
    }

    private getWorldLocation(position?: Vec2): Vec2 {
        return this.node.getParent().convertToWorldSpaceAR(position);
    }
}
