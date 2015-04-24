var BALL_RADIUS = 20;
var BALL_MAX = [ 20, 30, 40 ];
var MATCH_COUNT_ERASE = 3;
var TYPE_COUNT = 4;
var SHOOT_SPEED = 10;
var SHOOTING_BALL_POS = [ { x:240, y:160}, { x:240, y:160}, { x:179, y:165 } ]

var that;

var RAIL_INFO_LIST = [ [  { x : 492, y : 35, len : 0 },
                        { x : 104, y : 35, len : 0 },
                        { x : 72, y : 55, len : 0 },
                        { x : 52, y : 87, len : 0 },
                        { x : 40, y : 134, len : 0 },
                        { x : 40, y : 180, len : 0 },
                        { x : 60, y : 226, len : 0 },
                        { x : 92, y : 255, len : 0 },
                        { x : 133, y : 284, len : 0 },
                        { x : 196, y : 297, len : 0 },
                        { x : 315, y : 297, len : 0 },
                        { x : 372, y : 270, len : 0 },
                        { x : 416, y : 231, len : 0 },
                        { x : 450, y : 186, len : 0 },
                        { x : 450, y : 134, len : 0 },
                        { x : 416, y : 87, len : 0 },
                        { x : 348, y : 67, len : 0 },
                        { x : 267, y : 55, len : 0 },
                        { x : 216, y : 55, len : 0 },
                        { x : 160, y : 67, len : 0 },
                        { x : 112, y : 107, len : 0 },
                        { x : 97, y : 166, len : 0 },
                        { x : 124, y : 211, len : 0 },
                        { x : 180, y : 246, len : 0 },
                        { x : 242, y : 246, len : 0 },
                        { x : 307, y : 246, len : 0 },
                        { x : 372, y : 217, len : 0 },
                        { x : 392, y : 174, len : 0 },
                        { x : 392, y : 127, len : 0 },
                        { x : 335, y : 107, len : 0 },
                        { x : 267, y : 97, len : 0 },
                        { x : 209, y : 114, len : 0 },
                        { x : 176, y : 146, len : 0 },
                        { x : 176, y : 194, len : 0 },
                        { x : 236, y : 206, len : 0 },
                        { x : 295, y : 206, len : 0 },
                        { x : 335, y : 174, len : 0 },
                        { x : 303, y : 146, len : 0 } ],
        [{ x : 514, y : 146, len : 0 },
        { x : 487, y : 118, len : 0 },
        { x : 452, y : 93, len : 0 },
        { x : 411, y : 70, len : 0 },
        { x : 363, y : 47, len : 0 },
        { x : 314, y : 34, len : 0 },
        { x : 259, y : 29, len : 0 },
        { x : 200, y : 33, len : 0 },
        { x : 146, y : 48, len : 0 },
        { x : 106, y : 65, len : 0 },
        { x : 76, y : 89, len : 0 },
        { x : 42, y : 127, len : 0 },
        { x : 30, y : 172, len : 0 },
        { x : 37, y : 216, len : 0 },
        { x : 62, y : 257, len : 0 },
        { x : 101, y : 285, len : 0 },
        { x : 156, y : 298, len : 0 },
        { x : 221, y : 305, len : 0 },
        { x : 276, y : 302, len : 0 },
        { x : 329, y : 293, len : 0 },
        { x : 374, y : 282, len : 0 },
        { x : 414, y : 261, len : 0 },
        { x : 453, y : 234, len : 0 },
        { x : 468, y : 198, len : 0 },
        { x : 466, y : 160, len : 0 },
        { x : 430, y : 127, len : 0 },
        { x : 383, y : 101, len : 0 },
        { x : 328, y : 84, len : 0 },
        { x : 278, y : 79, len : 0 },
        { x : 218, y : 77, len : 0 },
        { x : 181, y : 88, len : 0 },
        { x : 144, y : 109, len : 0 },
        { x : 112, y : 141, len : 0 },
        { x : 95, y : 178, len : 0 },
        { x : 109, y : 222, len : 0 },
        { x : 143, y : 251, len : 0 },
        { x : 199, y : 261, len : 0 },
        { x : 262, y : 258, len : 0 },
        { x : 332, y : 246, len : 0 },
        { x : 383, y : 225, len : 0 },
        { x : 408, y : 192, len : 0 },
        { x : 394, y : 155, len : 0 },
        { x : 353, y : 137, len : 0 },
        { x : 301, y : 128, len : 0 },
        { x : 253, y : 125, len : 0 },
        { x : 215, y : 135, len : 0 },
        { x : 183, y : 156, len : 0 },
        { x : 160, y : 190, len : 0 },
        { x : 204, y : 213, len : 0 },
        { x : 257, y : 214, len : 0 },
        { x : 300, y : 197, len : 0 },
        { x : 344, y : 178, len : 0 }],
    [{ x : 469, y : -26, len : 0 },
        { x : 469, y : 273, len : 0 },
        { x : 439, y : 295, len : 0 },
        { x : 407, y : 274, len : 0 },
        { x : 407, y : 43, len : 0 },
        { x : 373, y : 23, len : 0 },
        { x : 344, y : 41, len : 0 },
        { x : 344, y : 277, len : 0 },
        { x : 314, y : 299, len : 0 },
        { x : 64, y : 299, len : 0 },
        { x : 39, y : 274, len : 0 },
        { x : 39, y : 59, len : 0 },
        { x : 67, y : 30, len : 0 },
        { x : 272, y : 30, len : 0 },
        { x : 299, y : 58, len : 0 },
        { x : 299, y : 239, len : 0 },
        { x : 270, y : 261, len : 0 },
        { x : 110, y : 257, len : 0 },
        { x : 77, y : 224, len : 0 },
        { x : 75, y : 104, len : 0 },
        { x : 108, y : 73, len : 0 },
        { x : 231, y : 72, len : 0 },
        { x : 261, y : 103, len : 0 },
        { x : 259, y : 197, len : 0 },
        { x : 224, y : 220, len : 0 },
        { x : 149, y : 220, len : 0 },
        { x : 116, y : 177, len : 0 },
        { x : 119, y : 135, len : 0 },
        { x : 173, y : 108, len : 0 },
        { x : 224, y : 143, len : 0 }]
];

var GameLayer = cc.Layer.extend({
    shootingBall:null,
    isShoot:false,
    shootAngle:0,
    windowWidth:0,
    windowHeight:0,
    speed:1,
    ballList:[],
    time:0,
    initBallSettingCount:0,
    isEnding:false,
    textClip:null,
    level:0,
    railInfoList:null,
    terminal:null,
    ctor:function () {
        this._super();

        this.windowWidth = cc.director.getWinSize().width;
        this.windowHeight = cc.director.getWinSize().height;

        this.createBG();

        this.showText("레벨" + this.level);

        that = this;
    },
    showText:function(text) {
        this.textClip = this.createTextClip(text);
        this.textClip.name = text;
        this.addChild(this.textClip);
        this.textClip.scaleX = this.textClip.scaleY = 0;
        var show = cc.scaleTo(0.2, 1,1);
        var delay = cc.delayTime(2);
        var hide = cc.scaleTo(0.2, 0, 0);
        var callback = cc.callFunc(this.textActionFinish);
        var seq;
        if(text == "ALL CLEAR")
            seq = cc.sequence(show);
        else seq = cc.sequence(show, delay, hide, callback);
        this.textClip.runAction(seq);

    },
    textActionFinish:function() {
        that.gameStart();
        that.removeChild(that.textClip);
    },
    createTextClip:function(text) {

        var tClip = new cc.Sprite();
        var labelTTF = new cc.LabelTTF(text, "Arial Black", 50);
        labelTTF.enableStroke(cc.color(0, 0, 0, 1), 3.0);
        tClip.addChild(labelTTF);
        tClip.setAnchorPoint(tClip.width / 2, tClip.height / 2);
        tClip.x = this.windowWidth / 2;
        tClip.y = this.windowHeight / 2;
        return tClip;
    },
    gameStart:function() {
        this.isShoot = false;
        this.shootAngle = 0;
        this.speed = 1;
        this.ballList = [];
        this.time = 0;
        this.initBallSettingCount = 0;
        this.isEnding = false;
        this.textClip = null;

        this.railInfoList = RAIL_INFO_LIST[this.level];

        if(this.shootingBall)
            this.removeChild(this.shootingBall);

        this.setRailLength();
        this.createShootingBall();
        this.addMouseEvent();
        this.scheduleUpdate();
        this.createTerminal();
    },
    createTerminal:function() {
        if(this.terminal) this.removeChild(this.terminal);
        this.terminal = this.createBall(3, this.railInfoList[this.railInfoList.length-1].x, this.railInfoList[this.railInfoList.length-1].y)
        this.terminal.opacity = 100;
        var labelTTF = new cc.LabelTTF("END", "Arial Black", 10);
        labelTTF.enableStroke(cc.color(0, 0, 0, 1), 3.0);
        this.terminal.addChild(labelTTF);
    },
    createShootingBall:function() {
        this.isShoot = false;
        var type = Math.floor(Math.random() * TYPE_COUNT);

        if(this.ballList.length <= MATCH_COUNT_ERASE) {
            if(this.ballList[0])
                type = this.ballList[0].type;
        }

        this.shootingBall = this.createBall(type, SHOOTING_BALL_POS[this.level].x, SHOOTING_BALL_POS[this.level].y, 0);
    },
    addMouseEvent:function() {
        cc.eventManager.addListener({
            event : cc.EventListener.MOUSE,
            onMouseDown : this.mouseDownHandler
        }, this);
    },
    removeMouseEvent:function() {
        cc.eventManager.removeListener({
            event : cc.EventListener.MOUSE,
            onMouseDown : this.mouseDownHandler
        });
    },
    createBG:function() {
        var bg = new cc.Sprite(res.bg_png);
        bg.anchorX = 0;
        bg.anchorY = 0;
        bg.opacity = 64;
        this.addChild(bg);
    },
    setRailLength:function() {
        for(var i = 0; i < this.railInfoList.length - 1; i++)
        {
            var dx = this.railInfoList[i].x - this.railInfoList[i+1].x;
            var dy = this.railInfoList[i].y - this.railInfoList[i+1].y;
            this.railInfoList[i].len = Math.sqrt(dx*dx + dy*dy);
        }
    },
    createBall:function(type, x, y, pos) {
        var ball;
        switch(type)
        {
            case 0:
                ball  = new cc.Sprite(res.ball_blue_png);
                break;
            case 1:
                ball  = new cc.Sprite(res.ball_yellow_png);
                break;
            case 2:
                ball  = new cc.Sprite(res.ball_red_png);
                break;
            case 3:
                ball  = new cc.Sprite(res.ball_white_png);
                break;
        }
        ball.type = type;
        ball.x = x;
        ball.y = y;
        ball.pos = pos;

        this.addChild(ball);
        return ball;
    },
    initBallSetting:function() {
        if(this.initBallSettingCount == 0) {
            this.addBall();
            this.initBallSettingCount++;
        }
        else {
            if(this.ballList[0] == null) return;
            if(this.ballList[0].pos > BALL_RADIUS && this.initBallSettingCount < BALL_MAX[this.level]) {
                this.addBall();
                this.initBallSettingCount++;
            }
        }
    },
    addBall:function() {
        var type = Math.floor(Math.random() * TYPE_COUNT);

        if(this.ballList.length >= MATCH_COUNT_ERASE - 1) {
            for(var i = 1; i < MATCH_COUNT_ERASE - 1; i++) {
                if(this.ballList[i].type != this.ballList[0].type)
                    break;
            }
            if(i == MATCH_COUNT_ERASE - 1) {
                while(type == this.ballList[0].type)
                    type = Math.floor(Math.random() * TYPE_COUNT);
            }
        }
        this.ballList.unshift(this.createBall(type, -100, -100, 0));
    },
    posUpdate:function() {
        if(this.ballList[0] == null)
        {
            this.level++;
            if(this.level == RAIL_INFO_LIST.length) {
                this.showText("ALL CLEAR");
            }
            else {
                this.showText("레벨" + this.level);
            }

            this.unscheduleUpdate();
            return;
        }

        if(this.isEnding == false) {
            this.time++;
            if (this.time < 150)
                this.speed = 6;
            else {
                this.speed = 1;
            }
        }

        this.ballList[0].pos += this.speed;

        for(var i = 1; i < this.ballList.length; i++)
        {
            var b0 = this.ballList[i-1];
            var b1 = this.ballList[i];
            var distance = b1.pos - b0.pos;

            if(distance < BALL_RADIUS)
                b1.pos = Math.min(b1.pos + (this.speed + 3), b0.pos + BALL_RADIUS)
            else if(distance > BALL_RADIUS)
                b1.pos = Math.max(b1.pos - (this.speed + 3), b0.pos + BALL_RADIUS);
        }
    },
    ballUpdate:function() {
        for(var i = 0; i < this.ballList.length; i++)
        {
            var op = this.ballList[i].opacity;

            if(op < 255)
            {
                this.ballList[i].opacity -= 30;

                if(this.ballList[i].opacity <= 0)
                {
                    this.eraseBall(i);
                    i--;
                }
            }
            this.setBallXY(i);
        }
    },
    shootingBallUpdate:function() {
        if(this.isShoot == false) return;

        this.shootingBall.x += SHOOT_SPEED * Math.cos(this.shootAngle);
        this.shootingBall.y += SHOOT_SPEED * Math.sin(this.shootAngle);

        if(this.shootingBall.x > this.windowWidth || this.shootingBall.x < 0 ||
            this.shootingBall.y > this.windowHeight || this.shootingBall.y < 0) {
            this.removeChild(this.shootingBall);
            this.createShootingBall();
        }
    },
    hitTest:function() {
        if(this.isShoot == false) return;

        for(var i = 0; i < this.ballList.length; i++)
        {
            var dx = this.ballList[i].x - this.shootingBall.x;
            var dy = this.ballList[i].y - this.shootingBall.y;

            var distance = Math.sqrt(dx*dx + dy*dy);

            if(distance < BALL_RADIUS)
            {
                var pos = this.ballList[i].pos;

                for(var j = 0; j < this.railInfoList.length && pos >= this.railInfoList[j].len; j++)
                {
                    pos -= this.railInfoList[j].len;
                }

                if(j < this.railInfoList.length)
                {
                    var rx = this.railInfoList[j+1].x - this.railInfoList[j].x;
                    var ry = this.railInfoList[j+1].y - this.railInfoList[j].y;

                    if(dx*rx+dy*ry > 0)
                    {
                        this.shootingBall.pos = this.ballList[i].pos;
                        this.ballList.splice(i, 0, this.shootingBall);
                    }
                    else
                    {
                        if(i == this.ballList.length - 1)
                        {
                            this.shootingBall.pos = this.ballList[i].pos + BALL_RADIUS;
                            this.ballList.push(this.shootingBall);
                        }
                        else
                        {
                            this.shootingBall.pos = this.ballList[i + 1].pos;
                            this.ballList.splice(i + 1, 0, this.shootingBall);
                        }
                    }
                    this.ballList[0].pos -= BALL_RADIUS / 2;
                }
                this.createShootingBall();
                break;
            }
        }
    },
    checkMatch:function() {
        for(var i = 0; i < this.ballList.length; i++)
        {
            var type = this.ballList[i].type;
            var j;
            for(j = i + 1; j < this.ballList.length && this.ballList[j].type == type && this.ballList[j].pos == this.ballList[j-1].pos + BALL_RADIUS; j++);
            if(j - i >= MATCH_COUNT_ERASE)
            {
                for (; i < j; i++)
                {
                    this.ballList[i].opacity = Math.min(245, this.ballList[i].opacity);
                }
            }
        }
    },
    update:function(delta) {
        this.initBallSetting();
        this.posUpdate();
        this.ballUpdate();
        this.shootingBallUpdate();
        this.hitTest();
        this.checkMatch();
    },
    eraseBall:function(index) {
        this.removeChild(this.ballList[index]);
        this.ballList.splice(index, 1);
    },
    setBallXY:function(index) {
        var ball = this.ballList[index];
        if(ball)
        {
            var pos = ball.pos;

            for(var i = 0; i < this.railInfoList.length && pos >= this.railInfoList[i].len; i++)
            {
                pos -= this.railInfoList[i].len;
            }

            if(i < this.railInfoList.length)
            {
                ball.x = this.railInfoList[i].x + (this.railInfoList[i + 1].x - this.railInfoList[i].x) * pos / this.railInfoList[i].len;
                ball.y = this.railInfoList[i].y + (this.railInfoList[i + 1].y - this.railInfoList[i].y) * pos / this.railInfoList[i].len;
            }
            else
            {
                this.eraseBall(index);

                if(this.isEnding == false) {
                    this.removeMouseEvent();
                    this.speed = 8;
                    this.isEnding = true;
                }
                if(index == 0) {
                    this.showText("레벨" + this.level + " 재도전")
                    this.unscheduleUpdate();
                }
            }
        }
    },
    mouseDownHandler:function(event) {
        if(that.isShoot) return;

        var downX = event.getLocationX();
        var downY = event.getLocationY();

        that.shootAngle = Math.atan2(downY - that.shootingBall.y, downX - that.shootingBall.x );
        that.isShoot = true;
    }
});

GameLayer.scene = function () {
    var scene = new cc.Scene();
    var layer = new GameLayer();
    scene.addChild(layer);
    return scene;
};