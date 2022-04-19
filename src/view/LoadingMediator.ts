/**載入 Mediator */
class LoadingMediator extends puremvc.Mediator {
    /**載入場景 */
    private loadingScene: LoadingScene = new LoadingScene();
    public constructor(mediatorName?: string, viewComponent?: Main) {
        super(mediatorName, viewComponent);
    }

    /**主場景 */
    public getStage(): Main {
        return this.viewComponent as Main;
    }

    public listNotificationInterests(): string[] {
        const list: string[] = super.listNotificationInterests();
        list.push(Notification.INIT_EVENT);
        list.push(Notification.LOADING_EVENT);
        return list;
    }

    public handleNotification(notification: puremvc.INotification): void {
        const name: string = notification.getName();
        const body: any = notification.getBody();
        const stage: Main = this.getStage();
        switch (name) {
            case Notification.INIT_EVENT:
                {
                    stage.addChild(this.loadingScene);
                }
                break;
            case Notification.LOADING_EVENT:
                {
                    const [isShow, percent] = body as any[];
                    isShow ? this.loadingScene.startLoading(percent) : this.loadingScene.finishLoading();
                    this.loadingScene.visible = isShow;
                }
                break;
        }
    }
}