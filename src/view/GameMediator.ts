/**遊戲 Mediator */
class GameMediator extends puremvc.Mediator {
    /**遊戲場景 */
    private gameScene: GameScene = new GameScene();

    /**遊戲結果暫存檔(配合動畫演出使用) */
    private resultTemp: SpinResultDto;
    public constructor(mediatorName?: string, viewComponent?: Main) {
        super(mediatorName, viewComponent);

        this.gameScene.addEventListener(GameEvent.PLAY, this.onPlay, this);
        this.gameScene.addEventListener(GameEvent.CHEAT, this.onCheat, this);
        document.addEventListener("keyup", this.onKeyUp.bind(this));
    }

    /**主場景 */
    public getStage(): Main {
        return this.viewComponent as Main;
    }

    public listNotificationInterests(): string[] {
        const list: string[] = super.listNotificationInterests();
        list.push(Notification.INIT_EVENT);
        list.push(Notification.GAME_RESULT_EVENT);
        list.push(Notification.UPDATE_CREDIT_EVENT);
        return list;
    }

    public handleNotification(notification: puremvc.INotification): void {
        const name: string = notification.getName();
        const body: any = notification.getBody();
        const stage: Main = this.getStage();
        switch (name) {
            case Notification.INIT_EVENT:
                {
                    stage.addChild(this.gameScene);
                }
                break;
            case Notification.GAME_RESULT_EVENT:
                {
                    this.resultTemp = notification.getBody() as SpinResultDto;
                    this.gameScene.run(this.resultTemp.icon);
                    this.gameScene.updateCredit(this.resultTemp.afterBetOfCredit);
                }
                break;
            case Notification.UPDATE_CREDIT_EVENT:
                {
                    const credit: number = notification.getBody() as number;
                    this.gameScene.updateCredit(credit);
                }
                break;
        }
    }

    /**下注 */
    private onPlay(e: egret.Event): void {
        this.sendNotification(Notification.GAME_SPIN_EVENT, e.data);
    }

    /**下注 */
    private onCheat(e: egret.Event): void {
        this.sendNotification(Notification.GAME_CHEAT_EVENT, e.data);
    }

    /**鍵盤輸入 */
    private onKeyUp(e: KeyboardEvent) {
        switch (e.keyCode) {
            case 192:
                {
                    this.gameScene.switchCheat();
                }
                break;
        }
    }
}