/**得獎動畫 */
class WinAnimation extends eui.Component implements eui.UIComponent {
	/**點數 */
	private credit: eui.Label;

	public constructor() {
		super();
	}

	/**更新點數 */
	public updateCredit(credit: number): void {
		this.credit.text = credit.toLocaleString();
	}
}