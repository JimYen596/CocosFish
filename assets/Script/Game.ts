import Vec2 = cc.Vec2;

const {ccclass, property} = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    @property(cc.Prefab)
    public bulletPrefab: cc.Prefab;

    @property(cc.Node)
    public cannon: cc.Node;

    @property(cc.Node)
    public sniperTarget: cc.Node;

    @property(cc.Prefab)
    public fish: cc.Prefab;

    public onLoad () {
        this.setPhysics();

        const touchReceiver = cc.Canvas.instance.node;
        touchReceiver.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        touchReceiver.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        touchReceiver.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);

        const fishPrefab = cc.instantiate(this.fish);
        cc.Canvas.instance.node.addChild(fishPrefab);
        fishPrefab.setPosition(cc.v2(0, 0));
    }

    public onDestroy () {
        const touchReceiver = cc.Canvas.instance.node;
        touchReceiver.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        touchReceiver.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        touchReceiver.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    public handleLongPressEvent(touchCounter: number, location: Vec2) {
        if (touchCounter > 1) {
            this.cannon.getComponent("Cannon").fire();
        }
    }

    public handleDoubleClickEvent(location: Vec2) {
    }

    private setPhysics() {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().gravity = cc.v2();
        cc.director.getCollisionManager().enabled = true;
    }

    private onTouchStart (event) {
        const cannon = this.cannon.getComponent("Cannon");
        this.sniperTarget.opacity = 255;
        this.sniperTarget.setPosition(event.getLocation());
        cannon.fire();
    }

    private onTouchMove (event) {
        this.sniperTarget.setPosition(event.getLocation());
    }

    private onTouchEnd (event) {
        this.sniperTarget.opacity = 0;
    }
}
