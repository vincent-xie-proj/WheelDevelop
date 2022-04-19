class LoadingScene extends eui.Component implements eui.UIComponent {
	/**下載 UI 群組 */
	private loadingGroup: eui.Group;

	/**載入顯示 */
	private loadingView: eui.Image;

	/**載入遮色 */
	private loadingMask: eui.Rect;

	/**讀取 bar 縮放時間 */
	private static LOADING_BAR_DURATION: number = 0.5;
	public constructor() {
		super();

		this.once(eui.UIEvent.COMPLETE, this.uiComplete, this);
		this.skinName = "LoadingSceneSkin";
	}

	/**元件建立 */
	private uiComplete(e: eui.UIEvent): void {
		// 物件必須等到uiComplete才能使用
		this.loadingView.mask = this.loadingMask;
		this.finishLoading();
	}

	/**開始 loading */
	public startLoading(percent: number): void {
		TweenLite.killTweensOf(this.loadingMask);
		TweenLite.to(this.loadingMask, LoadingScene.LOADING_BAR_DURATION, { scaleY: percent });
	}

	/**完成 loading */
	public finishLoading(): void {
		TweenLite.killTweensOf(this.loadingMask);
		this.loadingMask.scaleY = 0;
	}
}