import Vec2 = cc.Vec2;

const {ccclass, property} = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    @property(cc.Node)
    public weapon: cc.Node;

    public onLoad () {
        this.setPhysics();
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
