var MenuLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        this.init();
    },
    init:function()
    {
        var winSize = cc.director.getWinSize();
        var singalHeight = 36;
        var singalWidth = 123;
        var newGameNormal = new cc.Sprite(res.menu_png, cc.rect(0, 0, singalWidth, singalHeight));
        var newGameSelected = new cc.Sprite(res.menu_png, cc.rect(0, singalHeight, singalWidth, singalHeight));
        var newGameDisabled = new cc.Sprite(res.menu_png, cc.rect(0, singalHeight * 2, singalWidth, singalHeight));

        var newGame = new cc.MenuItemSprite(newGameNormal, newGameSelected, newGameDisabled, this.onNewGame, this);

        var menu = new cc.Menu(newGame);
        menu.alignItemsVerticallyWithPadding(15);
        this.addChild(menu, 1, 2);
        menu.x = winSize.width / 2;
        menu.y = winSize.height / 2;

        return true;
    },
    onNewGame:function()
    {
        cc.director.runScene(new cc.TransitionFade(1.2, GameLayer.scene()));
    }
});


MenuLayer.scene = function () {
    var scene = new cc.Scene();
    var layer = new MenuLayer();
    scene.addChild(layer);
    return scene;
};