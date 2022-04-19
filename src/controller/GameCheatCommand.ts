/**遊戲作弊 command */
class GameCheatCommand extends puremvc.SimpleCommand {
    public execute(notification: puremvc.INotification): void {
        const gameProxy: GameProxy = this.facade.retrieveProxy(ProxyConst.GAME) as GameProxy;
        const data: any = notification.getBody();
        const type: number = data[0];
        const result: any = data[1];
        switch (type) {
            case 0:
                {
                    gameProxy.addCredit(result);
                    this.sendNotification(Notification.UPDATE_CREDIT_EVENT, gameProxy.getCredit());
                }
                break;
            case 1:
                {
                    gameProxy.setCheatResult(result);
                }
                break;
        }
    }
}