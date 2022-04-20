/**挑選圖示 */
class SelectIcon extends eui.Component implements eui.UIComponent {
	/**圖示表 */
	private icons: eui.Image[] = [];

	/**目前顯示圖示 */
	private showIcon: number = 0;

	/**是否動畫中 */
	private isTween: boolean = false;

	/**選擇動畫秒數 */
	private static SELECT_DURATION: number = 0.1;
	public constructor() {
		super();
		this.once(eui.UIEvent.COMPLETE, this.uiComplete, this);
	}

	/**元件建立 */
	private uiComplete(e: eui.UIEvent): void {
		// 物件必須等到uiComplete才能使用
		for (let i: number = 0; i < 3; i++) {
			const icon: eui.Image = this[`icon${i}`];
			icon.texture = RES.getRes(`icon_json.icon${i}`);
			this.icons.push(icon);
		}

		/**預設顯示 */
		this.init(this.showIcon);
	}

	/**初始化 */
	public init(showIcon: number): void {
		// 清除動畫
		TweenLite.killTweensOf(this);
		this.putIcon(showIcon);
		this.isTween = false;
	}


	/**放置圖示 */
	private putIcon(showIcon: number): void {
		for (let i: number = 0; i < 3; i++) {
			const icon: eui.Image = this[`icon${i}`];
			let index: number = this.checkIndex(showIcon + i - 1);
			icon.texture = RES.getRes(`icon_json.icon${index}`);
		}

		this.showIcon = showIcon;
	}

	/**下一張圖示 */
	public next(): void {
		this.select(true);
	}


	/**上一張圖示 */
	public prev(): void {
		this.select(false);
	}

	/**選擇圖示 */
	private select(isNext: boolean): void {
		if (this.isTween) {
			return;
		}

		// 清除動畫
		TweenLite.killTweensOf(this);
		this.isTween = true;
		const endX: number = isNext ? -83 : 273;
		TweenLite.fromTo(this, SelectIcon.SELECT_DURATION, { x: 95 }, {
			x: endX, ease: Linear.easeNone, onComplete: () => {
				this.x = 95;
				this.putIcon(isNext ? this.checkIndex(++this.showIcon) : this.checkIndex(--this.showIcon));
				this.isTween = false;
			}
		})
	}

	/**取得目前顯示圖示 */
	public getShowIcon(): number {
		return this.showIcon;
	}

	/**檢查圖示索引 */
	private checkIndex(index: number): number {
		const countOfIcon: number = GameConst.COUNT_OF_ICON;
		if (index < 0) {
			index += countOfIcon;
		} else if (index >= countOfIcon) {
			index -= countOfIcon;
		}

		return index
	}
}