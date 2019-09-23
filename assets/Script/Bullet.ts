import {PhysicsColliderTag} from "../Constants/PhysicsColliderTag";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Bullet extends cc.Component {

    @property
    public speed: number = 0;

    @property
    public damage: number = 0;

    public onEndContact(contact, selfCollider, otherCollider) {
        const linearVelocity = this.node.getComponent(cc.RigidBody).linearVelocity;
        let rotateDegree = 0;
        if (otherCollider.node.group === "wall") {
            switch (otherCollider.tag) {
                case PhysicsColliderTag.TOP_WALL:
                case PhysicsColliderTag.BOTTOM_WALL:
                    rotateDegree = linearVelocity.x * (1 / Math.abs(linearVelocity.x)) * Math.abs(180 - Math.abs(this.node.rotation));
                    break;
                case PhysicsColliderTag.LEFT_WALL:
                case PhysicsColliderTag.RIGHT_WALL:
                    rotateDegree = -this.node.rotation;
                    break;
                default:
                    break;
            }
            this.rotateByDegree(rotateDegree);
        } else if (otherCollider.node.group === "fish") {
            this.node.destroy();
        }
    }

    public rotateByAngle(angle: number) {
        const rotation = cc.rotateTo(0.1, cc.misc.radiansToDegrees(angle));
        this.node.runAction(rotation);
    }

    public rotateByDegree(degree: number) {
        const rotation = cc.rotateTo(0, degree);
        this.node.runAction(rotation);
    }
}
