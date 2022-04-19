/**自訂按鈕 */
class CustomButton extends eui.Component implements eui.UIComponent {
    /**icon */
    private icon: eui.Image;

    /**一般代號 */
    private normalType: string;

    /**按下代號 */
    private downType: string;
    public constructor(normalType: string, downType: string) {
        super();
        this.normalType = normalType;
        this.downType = downType;
        this.once(eui.UIEvent.COMPLETE, this.uiComplete, this);
    }

    /**元件建立 */
    private uiComplete(e: eui.UIEvent): void {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    }

    /**按下按鈕 */
    private onTouchBegin(): void {
        this.icon.texture = RES.getRes(this.downType);
    }

    /**放開按鈕 */
    private onTouchEnd(): void {
        this.icon.texture = RES.getRes(this.normalType);
    }
}