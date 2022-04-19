class ControlPanel extends eui.Component implements eui.UIComponent {

	/**選擇圖示 */
	private selectIcon: SelectIcon;

	/**上一張圖示按鈕 */
	private prevButton: SelectButton;

	/**下一張圖示按鈕 */
	private nextButton: SelectButton;


	/**下注按鈕 */
	private playButton: PlayButton;

	/**圖示遮色片 */
	private iconMask: eui.Image;

	public constructor() {
		super();
		this.once(eui.UIEvent.COMPLETE, this.uiComplete, this);
	}

	/**元件建立 */
	private uiComplete(e: eui.UIEvent): void {
		// 物件必須等到uiComplete才能使用
		this.prevButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPrev, this);
		this.nextButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNext, this);
		this.playButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlay, this);
		this.selectIcon.mask = this.iconMask;
	}

	/**選擇上一張 */
	private onPrev(e: egret.TouchEvent): void {
		this.selectIcon.prev();
	}

	/**選擇下一張 */
	private onNext(e: egret.TouchEvent): void {
		this.selectIcon.next();
	}

	/**下注 */
	private onPlay(e: egret.TouchEvent): void {
		this.dispatchEvent(new egret.Event(GameEvent.PLAY, true, false, this.selectIcon.getShowIcon()));
	}
}