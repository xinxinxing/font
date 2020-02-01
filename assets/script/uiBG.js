// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
//声明9个点储存x，y坐标:
window.point = [[-240,150],[0,150],[240,150],
                [-240,0],[0,0],[240,0],
                [-240,-150],[0,-150],[240,-150]];
            
//判断标志：
window.drag = false;

//储存点是否已经画过(避免重复找点)，初始为false：
window.AlreadyPoint = [false,false,false,false,false,false,false,false,false];

//储存这个字的九个点对应的黑或白(true为黑，false为白)：
window.PointColor = [true,true,true,true,false,false,true,false,false];

//时间：
window.time = 0;

//对的点数：
window.PointCount = 0;
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
        draw : cc.Graphics,
        m_viewUI : cc.Node,
        btn :{
            default :null,
            type : cc.Button,
        }
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
         this.m_viewUI = this.m_viewUI.getComponent(cc.Animation);
         //this.m_viewUI.node.active = false; 
         this.m_viewUI.scaletohideplayend = function()
         {
            this.m_viewUI.node.active = false ; 

         }.bind(this)

     },
     start () {
        this.btn.node.active = false;
        this.draw.lineWidth = 30;
        this.node.on('touchstart',function(event){
            //每次按下都把时间置为0：
            time = 0;
            var t_pos = event.getLocation();
            //convertToNodeSpaceAR，获得的坐标相对于参照物的坐标（此时坐标系的原点在参照物的锚点）
            var pos = this.node.convertToNodeSpaceAR(t_pos);
            if(pos.x >= -283 && pos.x <= 290 && pos.y >= -261 && pos.y <= 312)
            {
                this.draw.moveTo(pos.x,pos.y);
                drag = false;
                cc.log(pos.x,pos.y);
                //按下时判断
                this.judge(pos.x,pos.y);
                this.node.on('touchmove',function(event){
                    if(drag == false)
                    {
                        var t_pos = event.getLocation();
                        var pos = this.node.convertToNodeSpaceAR(t_pos);
                        if(pos.x >= -283 && pos.x <= 290 && pos.y >= -261 && pos.y <= 312)
                        {
                            this.draw.lineTo(pos.x,pos.y);

                            //移动时判断
                            this.judge(pos.x,pos.y);

                            this.draw.stroke();
                            this.draw.moveTo(pos.x,pos.y);
                        }
                    }
                    else
                    {
                        this.node.off('touchmove',function(event){},this);
                    }
                    this.node.on('touchend',function(event){
                        drag = true;
                        },this)
                    },this)
            }
        },this);
    },

    clear (){
        this.draw.clear();
        for(var t = 0;t < 9;t++)
        {
            AlreadyPoint[t] = false;
        }
        PointCount = 0;
        time = 0;
    },
    judge : function (x , y){
        for(var i = 0;i < 9;i++)
        {
            //触碰到了这九个点
            if(AlreadyPoint[i] == false && 
               (x > point[i][0] - 20 && x < point[i][0] + 20 && y > point[i][1] - 20 && y < point[i][1] + 20))
            {
                //判断黑或白
                //如果是黑色
                if(PointColor[i] == true)
                {
                    PointCount++;
                }
                AlreadyPoint[i] = true;
            }
        }
    },

 /*   onClickScaleToShow:function()
    {
        this.m_viewUI.node.active = true ; 
        this.m_viewUI.play('show'); 


    },*/
    onClickScaleToHide:function()
    {
        this.m_viewUI.play('hide'); 
        this.btn.node.active = false;

    },
    

    update (dt) {
        if(drag == true)
        {
            time += dt;
        }
        if(time >= 2.5)
        {
            //把白点加起来：
            for(var j = 0;j < 9;j++)
            {
                if(PointColor[j] == false && AlreadyPoint[j] == false)
                {
                    PointCount++;
                }
            }
            if(PointCount >= 2)
            {
                cc.log(PointCount);
                cc.log("你画得真棒");
               // this.draw.clear();
                this.btn.node.active = true;
                this.m_viewUI.node.active = true ; 
                this.m_viewUI.play('show'); 
            }
            else
            {
                cc.log(PointCount);
                cc.log("你画得就nmb离谱");
            }
            time = -100;
        }
    },
});
