
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/res/res.js",
	"libs/modules/eui/eui.js",
	"libs/modules/tween/tween.js",
	"libs/modules/greensock/greensock.js",
	"libs/modules/puremvc/puremvc.js",
	"bin-debug/AppFacade.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/Controller/AppStartupCommand.js",
	"bin-debug/Controller/GameCheatCommand.js",
	"bin-debug/Controller/GameSpinCommand.js",
	"bin-debug/Controller/GameStartCommand.js",
	"bin-debug/Controller/InitControllerCommand.js",
	"bin-debug/Controller/InitModelCommand.js",
	"bin-debug/Controller/InitViewCommand.js",
	"bin-debug/Core/GameConst.js",
	"bin-debug/Core/GameEvent.js",
	"bin-debug/Core/Global.js",
	"bin-debug/Core/MediatorConst.js",
	"bin-debug/Core/Notification.js",
	"bin-debug/Core/ProxyConst.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/Model/Dao/CheatDao.js",
	"bin-debug/Model/Dto/SpinResultDto.js",
	"bin-debug/Model/GameProxy.js",
	"bin-debug/ThemeAdapter.js",
	"bin-debug/View/Component/ControlPanel.js",
	"bin-debug/View/Component/CustomButton.js",
	"bin-debug/View/Component/GameScene.js",
	"bin-debug/View/Component/GameSound.js",
	"bin-debug/View/Component/LoadingScene.js",
	"bin-debug/View/Component/MessageAlert.js",
	"bin-debug/View/Component/MessageCloseButton.js",
	"bin-debug/View/Component/MessageConfirmButton.js",
	"bin-debug/View/Component/PlayButton.js",
	"bin-debug/View/Component/SelectButton.js",
	"bin-debug/View/Component/SelectIcon.js",
	"bin-debug/View/Component/Wheel.js",
	"bin-debug/View/Component/WinAnimation.js",
	"bin-debug/View/GameMediator.js",
	"bin-debug/View/LoadingMediator.js",
	"bin-debug/View/MessageMediator.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    if(egret_native.featureEnable) {
        //控制一些优化方案是否开启
        egret_native.featureEnable({
            
        });
    }
    egret_native.requireFiles();
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 640,
		contentHeight: 960,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel("/system/fonts/DroidSansFallback.ttf", 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};