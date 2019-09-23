import Vec2 = cc.Vec2;

const {ccclass, property} = cc._decorator;

@ccclass
export default class LongTouchComponent extends cc.Component {
    @property({
        tooltip: "長按事件觸發間隔"
    })
    touchInterval: number = 0.1;

    @property({
        type: [cc.Component.EventHandler],
        tooltip: "長按事件"
    })
    longTouchEvents: cc.Component.EventHandler[] = [];

    @property({
        type: cc.Component.EventHandler,
        tooltip: "雙擊事件"
    })
    doubleTouchEvent: cc.Component.EventHandler = null;

    private _touchCounter: number = 0;
    private _touchLocation: Vec2 = cc.v2(0, 0);
    private _isTouching: boolean = false;
    private _holdClickCount: number = 0;
    private _holdTimeEclipse: number = 0;

    public onEnable() {
        this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
    }

    public onDisable() {
        this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
    }


    public update (dt) {
        if (this._isTouching) {
            this._holdTimeEclipse ++;
        }
    }

    private _onTouchStart(event: cc.Event.EventTouch) {
        this._touchLocation = event.getLocation();

        if (this._isTouching) {
            return;
        }

        this._isTouching = this.node.getBoundingBoxToWorld().contains(this._touchLocation);

        if (this._isTouching) {
            this._holdTimeEclipse = 0;
            this.publishOneTouch(this._touchLocation);
            this.schedule(this._touchCounterCallback, this.touchInterval);
        }
    }

    private _onTouchMove(event: cc.Event.EventTouch) {
        this._touchLocation = event.getLocation();
    }

    private _onTouchEnd(event: cc.Event.EventTouch) {
        this._isTouching = false;
        this._touchCounter = 0;
        this._holdTimeEclipse = 0;
        this._holdClickCount ++;
        this.unschedule(this._touchCounterCallback);

        setTimeout(() => {
            if (this._holdClickCount > 1) {
                this.publishDoubleTouch(event.getLocation());
            }
            this._holdClickCount = 0;
        }, 400)
    }

    private _onTouchCancel(event: cc.Event.EventTouch) {
        this._isTouching = false;
        this._touchCounter = 0;
        this._holdTimeEclipse = 0;
        this._holdClickCount = 0;
        this.unschedule(this._touchCounterCallback);
    }

    private _touchCounterCallback() {
        this._holdClickCount = 0;
        this._isTouching ? this.publishOneTouch(this._touchLocation) : this.unschedule(this._touchCounterCallback);
    }

    private publishOneTouch(touchLoc: Vec2) {
        if (!this._isTouching) {
            return;
        }
        this._touchCounter++;
        this.longTouchEvents.forEach((eventHandler: cc.Component.EventHandler) => {
            eventHandler.emit([this._touchCounter, touchLoc]);
        });
    }

    private publishDoubleTouch(touchLoc: Vec2) {
        this.doubleTouchEvent.emit([this._touchCounter, touchLoc]);
    }
}
