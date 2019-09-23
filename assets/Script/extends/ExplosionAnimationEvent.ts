const {ccclass, property} = cc._decorator;

@ccclass
export default class ExplosionAnimationEvent extends cc.Component {

    public onCompleted() {
        this.node.destroy();
    }

}
