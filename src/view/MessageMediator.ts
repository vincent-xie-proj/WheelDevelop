/**訊息 Mediator */
class MessageMediator extends puremvc.Mediator {
    public constructor(mediatorName?: string, viewComponent?: Main) {
        super(mediatorName, viewComponent);
    }

    public getViewComponent(): Main {
        return this.viewComponent as Main;
    }

    public listNotificationInterests(): string[] {
        return [
            NotificationEvent[NotificationEvent.INIT_EVENT],
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const name: string = notification.getName();
        switch (name) {
            case NotificationEvent[NotificationEvent.INIT_EVENT]:
                {
                }
                break;
        }
    }
}