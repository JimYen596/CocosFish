const {ccclass} = cc._decorator;

@ccclass
export default class Target extends cc.Component {

    protected onLoad() {
        const touchReceiver = cc.Canvas.instance.node;
        touchReceiver.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        touchReceiver.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        touchReceiver.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    protected onDestroy () {
        const touchReceiver = cc.Canvas.instance.node;
        touchReceiver.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        touchReceiver.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        touchReceiver.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    protected start () {

    }

    protected update (dt) {

    }

    private onTouchStart (event) {
        this.node.opacity = 255;
        this.node.setPosition(event.getLocation());
    }

    private onTouchMove (event) {
        this.node.setPosition(event.getLocation());
    }

    private onTouchEnd () {
        this.node.opacity = 0;
    }
}
