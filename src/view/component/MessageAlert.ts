/**訊息彈窗 */
class MessageAlert extends eui.Component implements eui.UIComponent {
	/**ui group */
	private uiGroup: eui.Group;

	/**文字訊息 */
	private messageText: eui.Label;

	/**確認按鈕 */
	private confirmButton: MessageConfirmButton;

	/**關閉按鈕 */
	private closeButton: MessageCloseButton;

	/**縮放時間 */
	private static SCALE_DURATION: number = 0.2;
	public constructor() {
		super();
		this.once(eui.UIEvent.COMPLETE, this.uiComplete, this);
		this.skinName = "MessageAlertSkin";
	}

	/**元件建立 */
	private uiComplete(e: eui.UIEvent): void {
		this.confirmButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeMessage, this);
		this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeMessage, this);
		this.init();
	}

	/**初始化 */
	public init(): void {
		this.closeMessage(null);
	}

	/**顯示訊息 */
	public showMessage(text: string): void {
		this.messageText.text = text;
		TweenLite.killTweensOf(this.uiGroup);
		TweenLite.fromTo(this.uiGroup, MessageAlert.SCALE_DURATION, { scaleX: 0.1, scaleY: 0.1 }, {
			scaleX: 1, scaleY: 1,
			onStart: () => {
				// 開始補間動畫後再顯示出來，不然會發生補間動畫來不及跑的詭異情況
				this.visible = true;
			}
		})
	}

	/**關閉訊息 */
	public closeMessage(e: egret.TouchEvent): void {
		TweenLite.killTweensOf(this.uiGroup);
		this.messageText.text = "";
		this.visible = false;
	}
}