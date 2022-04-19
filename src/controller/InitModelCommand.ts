/**初始化 Model command */
class InitModelCommand extends puremvc.SimpleCommand {
    public execute(notification: puremvc.INotification): void {
        this.facade.registerProxy(new GameProxy(ProxyConst.GAME));
    }
}