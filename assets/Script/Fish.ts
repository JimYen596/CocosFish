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
            cc.loader.loadRes("prefabs/explosion_1", (err, prefab) => {
                if (!err) {
                    const newNode = cc.instantiate(prefab);
                    this.node.addChild(newNode);
                    newNode.setPosition(contact.getManifold().localPoint);
                }
            });
        }
    }

    public update(dt: number) {
        const position = this.node.getPosition();
        this.node.setPosition(cc.v2(position.x + 1, position.y));
    }
}
