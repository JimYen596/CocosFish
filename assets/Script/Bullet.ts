import {getDegreeByDirection} from "../Utils/getDegreeByDirection";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Bullet extends cc.Component {

    @property
    public speed: number = 100;

    @property
    public damage: number = 0;

    @property
    public degree: number = 0;

    private shot = false;

    public update(dt: number) {
        if (this.shot) {
            const velocity = this.node.getComponent("cc.RigidBody").linearVelocity;
            this.node.angle = getDegreeByDirection(velocity) - 90;
        }
    }

    public shootTo(degree: number) {
        this.shot = true;
    }

    public onBeginContact(contact, selfCollider, otherCollider) {
        if (otherCollider.node.group === "fish") {
            const anim = this.getComponent(cc.Animation);
            let animState = anim.getAnimationState("explosion_1");
            animState.wrapMode = cc.WrapMode.Normal;
            anim.on("finished", () => {
                this.node.destroy();
            });
            anim.play("explosion_1");
            this.node.getComponent("cc.RigidBody").linearVelocity = cc.v2(0, 0);
        }
    }
}
