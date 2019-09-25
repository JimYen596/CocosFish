import Vec2 = cc.Vec2;

const {ccclass, property} = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    @property(cc.Prefab)
    public bulletPrefab: cc.Prefab;

    @property(cc.Node)
    public weapon: cc.Node;

    @property(cc.Node)
    public sniperTarget: cc.Node;

    @property(cc.Prefab)
    public fish: cc.Prefab;

    public onLoad () {
        this.setPhysics();

        const fishPrefab = cc.instantiate(this.fish);
        cc.Canvas.instance.node.addChild(fishPrefab);
        fishPrefab.setPosition(cc.v2(0, 0));
    }

    public update(dt: number) {
    }

    public onDestroy () {
    }

    public handleLongPressEvent(touchCounter: number, location: Vec2) {
        this.weapon.getComponent("Cannon").fire();
    }

    public handleDoubleClickEvent(location: Vec2) {
        cc.log("handleDoubleClickEvent")
    }

    private setPhysics() {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().gravity = cc.v2();
        cc.director.getCollisionManager().enabled = true;
    }
}
