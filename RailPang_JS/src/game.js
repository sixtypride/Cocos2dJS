var BALL_RADIUS = 20;
var BALL_MAX = 10;
var MATCH_COUNT_ERASE = 3;
var TYPE_COUNT = 4;
var SHOOT_SPEED = 10;

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
    railInfoList:[  { x : 492, y : 35, len : 0 },
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

    ctor:function () {
        this._super();

        this.windowWidth = cc.director.getWinSize().width;
        this.windowHeight = cc.director.getWinSize().height;

        this.createBG();
        this.init();
    },
    init:function() {
        this.setRailLength();
        this.createShootingBall();
        this.addMouseEvent();
        this.scheduleUpdate();
    },
    createShootingBall:function() {
        this.isShoot = false;
        var type = Math.floor(Math.random() * TYPE_COUNT);

        if(this.ballList.length <= MATCH_COUNT_ERASE) {
            if(this.ballList[this.ballList.length - 1])
                type = this.ballList[this.ballList.length - 1].type;
        }
        this.shootingBall = this.createBall(type, this.windowWidth / 2, this.windowHeight / 2, 0);
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

        /*
        var labelTTF = new cc.LabelTTF();
        labelTTF.setString("S");
        labelTTF.setAnchorPoint(0,0);
        labelTTF.scaleX = 0.5;
        labelTTF.scaleY = 0.5;
        labelTTF.enableStroke(cc.color(0, 0, 0, 1), 3.0);
        ball.addChild(labelTTF);

        ball.text = labelTTF;
        */

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
            if(this.ballList[0].pos > BALL_RADIUS && this.initBallSettingCount < BALL_MAX) {
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
            cc.log("level clear");
            this.unscheduleUpdate();
            return;
        }

        if(this.isEnding == false) {
            this.time++;
            if (this.time < 200)
                this.speed = 4;
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
            if(this.ballList[i].text)
                this.ballList[i].text.setString(i);

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
                    cc.log("아웃");
                    this.removeMouseEvent();
                    this.speed = 8;
                    this.isEnding = true;
                }

                if(index == 0) {
                    cc.log("완전 종료");
                    this.unscheduleUpdate();
                }
            }
        }
    },
    mouseDownHandler:function(event) {
        var that = event.getCurrentTarget();

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