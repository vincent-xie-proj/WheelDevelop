/**轉輪 */
class Wheel extends eui.Component implements eui.UIComponent {
	/**圖示表 */
	private icons: eui.Image[] = [];

	/**圖示索引表 */
	private iconIndexs: number[] = [];

	/**模糊效果 */
	private blurFilter: egret.BlurFilter = new egret.BlurFilter(0, 0);

	/**捕間角度 */
	private tweenRotation: number = 0;


	/**等分角 */
	private static EQUAL_PART_ANGLE: number = 360 / GameConst.COUNT_OF_ICON;

	/**角度偏移量 */
	private static OFFSET_ANGLE: number = Wheel.EQUAL_PART_ANGLE * 0.45;

	/**轉動緩衝時間 */
	private static BUFFER_DURATION: number = 1.5;

	/**轉動緩衝所需角度 */
	private static BUFFER_ROTATION: number = 270;

	/**轉動時間 */
	private static RUN_DURATION: number = 0.5;

	/**轉動次數 */
	private static RUN_TIMES: number = 5;

	/**最大模糊量 */
	private static MAX_BLUR: number = 5;

	public constructor() {
		super();
		this.once(eui.UIEvent.COMPLETE, this.uiComplete, this);
	}

	/**元件建立 */
	private uiComplete(e: eui.UIEvent): void {
		// 物件必須等到uiComplete才能使用
		const countOfIcon: number = GameConst.COUNT_OF_ICON;
		for (let i: number = 0; i < countOfIcon; i++) {
			const icon: eui.Image = this[`icon${i}`];
			this.icons.push(icon);
		}

		/**預設顯示 */
		this.init();
	}

	/**初始化 */
	public init(): void {
		// 清除動畫
		TweenLite.killTweensOf(this);

		// 隨機排序
		const countOfIcon: number = GameConst.COUNT_OF_ICON;
		for (let i: number = 0; i < countOfIcon; i++) {
			this.iconIndexs.push(i);
		}
		Global.random(this.iconIndexs, false);

		for (let i: number = 0; i < countOfIcon; i++) {
			this.icons[i].texture = RES.getRes(`icon_json.icon${this.iconIndexs[i]}`);
		}

		this.filters = [this.blurFilter];
		this.blurFilter.blurY = 0;
		this.rotation = this.tweenRotation;
	}

	/**轉動 */
	public run(appointIcon: number): void {
		// 清除動畫
		TweenLite.killTweensOf(this);

		/**
		 * 計算所需資訊
		 * 因為元件的 rotation 會有180度後從-179度開始，以及過了360度會從0開始等問題，為了不影響計算，故採用變數 tweenRotation 來完整記錄角度轉動的度數
		 */
		// 
		const targetIndex: number = this.iconIndexs.indexOf(appointIcon);
		const startRotation: number = this.rotation + 360; // 因為起始角度若超過180度會從負數開始，故統一+360強制轉正數再計算
		const repeatStartRotation: number = startRotation + Wheel.BUFFER_ROTATION;
		const repeatEndRotation: number = startRotation + Wheel.BUFFER_ROTATION + 360;
		let endRotation: number = (GameConst.COUNT_OF_ICON - targetIndex) * Wheel.EQUAL_PART_ANGLE + (Math.random() - 0.5) * Wheel.OFFSET_ANGLE; // 因為是順時針轉，所以角度要逆著算 :: COUNT_OF_ICON - targetIndex
		while (endRotation - repeatEndRotation < 180) {
			endRotation += 360;
		}

		// 起始緩衝
		const startTimeLine: TimelineLite = new TimelineLite();
		const startTweenLite: TweenLite = TweenLite.fromTo(this, Wheel.BUFFER_DURATION, { tweenRotation: startRotation }, {
			tweenRotation: repeatStartRotation, ease: Power2.easeIn, immediateRender: false, onUpdate: () => {
				const progress: number = (this.tweenRotation - startRotation) / (repeatStartRotation - startRotation);
				this.blurFilter.blurX = this.blurFilter.blurY = Wheel.MAX_BLUR * progress;
				this.rotation = this.tweenRotation;
			}
		});
		startTimeLine.add(startTweenLite);

		// 重複轉動
		const runTimeLine: TimelineMax = new TimelineMax({ repeat: Wheel.RUN_TIMES }); // TimelineMax 才有 repeat
		runTimeLine.add(TweenLite.fromTo(this, Wheel.RUN_DURATION, { tweenRotation: repeatStartRotation }, {
			tweenRotation: repeatEndRotation, ease: Linear.easeNone, immediateRender: false, onUpdate: () => {
				this.rotation = this.tweenRotation;
			}
		}));

		// 結束緩衝
		const endTimeLine: TimelineLite = new TimelineLite();
		const endTweenLite: TweenLite = TweenLite.fromTo(this, Wheel.BUFFER_DURATION, { tweenRotation: repeatEndRotation }, {
			tweenRotation: endRotation, ease: Power2.easeOut, immediateRender: false, onUpdate: () => {
				const progress: number = (this.tweenRotation - repeatEndRotation) / (endRotation - repeatEndRotation);
				this.blurFilter.blurX = this.blurFilter.blurY = Wheel.MAX_BLUR * (1 - progress);
				this.rotation = this.tweenRotation;
			}
		});
		endTimeLine.add(endTweenLite);

		// 播放時間軸
		const timeLine: TimelineLite = new TimelineLite({
			onComplete: () => {
				this.dispatchEvent(new egret.Event(GameEvent.FINISH_RUN));
			}
		});
		timeLine.add(startTimeLine);
		timeLine.add(runTimeLine);
		timeLine.add(endTimeLine);
	}
}