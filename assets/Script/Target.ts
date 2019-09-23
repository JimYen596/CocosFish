const {ccclass, property} = cc._decorator;

@ccclass
export default class Target extends cc.Component {

    @property(cc.Node)
    focusNode: cc.Node = null;

    start () {

    }

    update (dt) {
        if (this.focusNode) {
            this.node.setPosition(cc.Canvas.instance.node.convertToWorldSpaceAR(this.focusNode.position));
        }
    }
}
