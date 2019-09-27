import Vec2 = cc.Vec2;

const {ccclass, property} = cc._decorator;

@ccclass
export default class Fish extends cc.Component {

    @property
    category: string = "";

    @property
    life: number = 0;

    public onLoad() {
    }

    public onBeginContact(contact, selfCollider, otherCollider) {
        if (otherCollider.node.group === "bullet") {
            // should play on hit animation
        }
    }

    public update(dt: number) {
    }
}
