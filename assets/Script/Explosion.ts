const {ccclass} = cc._decorator;

@ccclass
export default class Explosion extends cc.Component {
    public onLoad () {
        const anim = this.getComponent(cc.Animation);
        anim.play("explosion_1");
    }
}
