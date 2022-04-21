/**遊戲場景組件 */
class GameScene extends eui.Component implements eui.UIComponent {
	/**轉輪 */
	private wheel: Wheel;

	/**控制面板 */
	private controlPanel: ControlPanel;

	/**點數 */
	private credit: eui.Label;

	/**作弊輸入框 */
	private cheatInput: eui.TextInput;

	/**作弊錯誤訊息 */
	private errorMessage: eui.Label;

	/**得獎動畫 */
	private winAnimation: WinAnimation;

	/**得獎動畫遮色片 */
	private winMask: eui.Image;

	/**遊戲背景音樂 */
	private backgroundSound: GameSound;

	/**遊戲中獎音樂 */
	private winSound: GameSound;

	/**得獎動畫時間 */
	private static WIN_DURATION: number = 0.3;
	public constructor() {
		super();
		this.once(eui.UIEvent.COMPLETE, this.uiComplete, this);
		this.skinName = "GameSceneSkin";
	}

	/**元件建立 */
	private uiComplete(e: eui.UIEvent): void {
		// 物件必須等到uiComplete才能使用
		document.addEventListener("keyup", this.onKeyUp.bind(this));
		this.controlPanel.addEventListener(GameEvent.SPIN, this.onSpin, this);
		this.wheel.addEventListener(GameEvent.FINISH_RUN, this.onFinishRun, this);
		this.cheatInput.prompt = `操控轉輪:請輸入 i=數字，ex: i=1，增加點數:請輸入 $數字，ex:$100，輸入完成後請按下Enter發送指令`;
		this.cheatInput.addEventListener(eui.UIEvent.CHANGE, this.onInputCommand, this);
		this.winAnimation.mask = this.winMask;
		this.backgroundSound = new GameSound(egret.Sound.MUSIC, "resource/assets/Sound/background.mp3");
		this.winSound = new GameSound(egret.Sound.EFFECT, "resource/assets/Sound/win.wav");
		this.init();
	}

	/**初始化 */
	public init(): void {
		this.closeCheat();
		this.closeWin();
	}

	/**顯示場景 */
	public onShow(): void {
		this.backgroundSound.onPlay();
		this.visible = true;
	}

	/**隱藏場景 */
	public onHide(): void {
		this.backgroundSound.onStop();
		this.visible = false;
	}

	/**下注 */
	private onSpin(e: egret.Event): void {
		this.dispatchEvent(new egret.Event(GameEvent.SPIN, false, false, e.data));
	}

	/**轉動 */
	public run(appointIcon: number): void {
		this.controlPanel.switchDisabled(true);
		this.wheel.run(appointIcon);
		this.closeWin();
	}

	/**完成轉動 */
	private onFinishRun(e: egret.Event): void {
		this.dispatchEvent(new egret.Event(GameEvent.FINISH_RUN));
		this.controlPanel.switchDisabled(false);
	}

	/**更新點數 */
	public updateCredit(credit: number): void {
		this.credit.text = credit.toLocaleString();
	}

	/**顯示下注結果 */
	public showResult(isWin: boolean, bonus: number): void {
		if (isWin) {
			this.winAnimation.updateCredit(bonus);
			this.showWin();
		}
	}

	/**顯示中獎畫面 */
	private showWin(): void {
		// 清除動畫
		TweenLite.killTweensOf(this);

		TweenLite.fromTo(this.winMask, GameScene.WIN_DURATION, { x: -800 }, {
			x: 0, ease: Linear.easeNone, onStart: () => {
				this.winAnimation.visible = true;
			}
		})

		this.winSound.onPlay(0, 1, false);
	}

	/**關閉中獎畫面 */
	private closeWin(): void {
		// 清除動畫
		TweenLite.killTweensOf(this);
		this.winAnimation.visible = false;
	}

	/**作弊開關 */
	public switchCheat(): void {
		const isOpen: boolean = this.cheatInput.visible;
		if (isOpen) {
			this.closeCheat();
		} else {
			this.openCheat();
		}
	}

	/**開啟作弊介面 */
	private openCheat(): void {
		this.cheatInput.enabled = true;
		this.cheatInput.visible = true;
		this.errorMessage.visible = true;
	}

	/**關閉作弊介面 */
	private closeCheat(): void {
		this.cheatInput.text = "";
		this.cheatInput.visible = false;
		this.errorMessage.text = "";
		this.errorMessage.visible = false;

		const focusElement: Element = document.activeElement;
		if (focusElement.id === "egretInput") {
			focusElement["blur"]();
		}
	}

	/**鍵盤輸入 */
	private onKeyUp(e: KeyboardEvent) {
		const isOpen: boolean = this.cheatInput.visible;
		if (!isOpen) {
			return;
		}

		switch (e.key) {
			case "Enter":
				{
					this.sendCheat();
				}
				break;
		}
	}

	/**發送作弊指令 */
	private sendCheat(): void {
		const regExp: RegExp = new RegExp("\\s*", "g");
		let text: string = this.cheatInput.text;
		text = text.replace(regExp, "");

		let isSuccess: boolean = false;
		if (text.indexOf("$") !== -1) {
			isSuccess = this.sendCheatCredit(text);
		} else if (text.indexOf("i=") !== -1) {
			isSuccess = this.sendCheatIcon(text);
		} else {
			this.errorMessage.text = "輸入錯誤格式，請重新輸入";
		}

		if (isSuccess) {
			this.errorMessage.text = "指令已發送";
		}
	}

	/**發送增加點數指令 */
	private sendCheatCredit(text: string): boolean {
		const credit: number = parseInt(text.replace("$", ""), 10);
		if (isNaN(credit)) {
			this.errorMessage.text = "輸入錯誤格式，請重新輸入";
			return false;
		}

		this.dispatchEvent(new egret.Event(GameEvent.CHEAT, false, false, [0, credit]));
		return true;
	}

	/**發送轉輪作弊指令 */
	private sendCheatIcon(text: string): boolean {
		const icon: number = parseInt(text.replace("i=", ""), 10);
		if (isNaN(icon)) {
			this.errorMessage.text = "輸入錯誤格式，請重新輸入";
			return false;
		}

		if (icon < 0 || icon >= GameConst.COUNT_OF_ICON) {
			this.errorMessage.text = "指定圖示編號不存在，請重新輸入";
			return false;
		}

		this.dispatchEvent(new egret.Event(GameEvent.CHEAT, false, false, [1, icon]));
		return true;
	}

	/**輸入作弊指令 */
	private onInputCommand(e: eui.UIEvent): void {
		this.errorMessage.text = "";
	}
}