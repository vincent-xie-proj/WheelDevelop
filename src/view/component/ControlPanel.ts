/**控制面板組件 */
class ControlPanel extends eui.Component implements eui.UIComponent {
	/**是否禁能 */
	private isDisabled: boolean;

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

	/**下注音效 */
	private spinSound: GameSound;

	/**選擇音效 */
	private selectSound: GameSound;

	public constructor() {
		super();
		this.once(eui.UIEvent.COMPLETE, this.uiComplete, this);
	}

	/**元件建立 */
	private uiComplete(e: eui.UIEvent): void {
		// 物件必須等到uiComplete才能使用
		this.prevButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPrev, this);
		this.nextButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNext, this);
		this.playButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSpin, this);
		this.selectIcon.mask = this.iconMask;
		this.spinSound = new GameSound(egret.Sound.EFFECT, "resource/assets/Sound/spin.mp3");
		this.selectSound = new GameSound(egret.Sound.EFFECT, "resource/assets/Sound/select.mp3");
	}

	/**選擇上一張 */
	private onPrev(e: egret.TouchEvent): void {
		if (this.isDisabled) return;

		this.selectSound.onPlay(0, 1, false);
		this.selectIcon.prev();
	}

	/**選擇下一張 */
	private onNext(e: egret.TouchEvent): void {
		if (this.isDisabled) return;

		this.selectSound.onPlay(0, 1, false);
		this.selectIcon.next();
	}

	/**下注 */
	private onSpin(e: egret.TouchEvent): void {
		if (this.isDisabled) return;

		this.spinSound.onPlay(0, 1, false);
		this.dispatchEvent(new egret.Event(GameEvent.SPIN, false, false, this.selectIcon.getShowIcon()));
	}

	/**禁能開關 */
	public switchDisabled(isDisabled: boolean): void {
		this.prevButton.enabled = !isDisabled;
		this.nextButton.enabled = !isDisabled;
		this.playButton.enabled = !isDisabled;
	}
}