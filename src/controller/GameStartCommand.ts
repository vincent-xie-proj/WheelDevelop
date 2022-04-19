/**遊戲開始 command */
class GameStartCommand extends puremvc.SimpleCommand {
    public execute(notification: puremvc.INotification): void {
        const gameProxy: GameProxy = this.facade.retrieveProxy(ProxyConst.GAME) as GameProxy;
        this.sendNotification(Notification.LOADING_EVENT, [false, 1])
    }
}