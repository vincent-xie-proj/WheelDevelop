/**遊戲資料 */
class GameProxy extends puremvc.Proxy implements puremvc.IProxy {

    public constructor(proxyName?: string, data?: any) {
        super(proxyName, data);
        this.init();
    }

    /**初始化資料 */
    public init(): void {

    }
}