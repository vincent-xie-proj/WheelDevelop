/**訊息 Mediator */
class MessageMediator extends puremvc.Mediator {
    /**訊息場景 */
    private messageAlert: MessageAlert = new MessageAlert();
    public constructor(mediatorName?: string, viewComponent?: Main) {
        super(mediatorName, viewComponent);
    }

    public getViewComponent(): Main {
        return this.viewComponent as Main;
    }

    public listNotificationInterests(): string[] {
        const list: string[] = super.listNotificationInterests();
        list.push(Notification.INIT_EVENT);
        list.push(Notification.MESSAGE_EVENT);
        return list;
    }

    public handleNotification(notification: puremvc.INotification): void {
        const name: string = notification.getName();
        switch (name) {
            case Notification.INIT_EVENT:
                {
                    this.getViewComponent().addChild(this.messageAlert);
                }
                break;
            case Notification.MESSAGE_EVENT:
                {
                    const message: string = notification.getBody() as string;
                    this.messageAlert.showMessage(message)
                }
                break;
        }
    }
}