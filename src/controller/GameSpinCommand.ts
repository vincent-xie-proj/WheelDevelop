/**遊戲下注 command */
class GameSpinCommand extends puremvc.SimpleCommand {
    public execute(notification: puremvc.INotification): void {
        const gameProxy: GameProxy = this.facade.retrieveProxy(ProxyConst.GAME) as GameProxy;
        const spinIcon: number = notification.getBody() as number;
        const result: SpinResultDto = gameProxy.spin(spinIcon);
        if (result.isSpinSuccess) {
            this.sendNotification(Notification.GAME_RESULT_EVENT, result);
        } else {
            this.sendNotification(Notification.MESSAGE_EVENT, result.message);
        }
    }
}