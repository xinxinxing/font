// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var time2 = 0;
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        m_viewUI : cc.Node,
        scene:"first",
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
         this.m_viewUI = this.m_viewUI.getComponent(cc.Animation);
         this.scene = "first";
     },
    start () {
        this.m_viewUI.node.active = true;
        this.m_viewUI.play('second show');
        time2 = 0;
        
        

    },

     update (dt) {
        time2 +=dt;
        if(time2>=5)
        {
            cc.director.loadScene(this.scene);
            cc.log("aaaa");
        }
     },
});
