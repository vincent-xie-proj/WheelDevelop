/**初始化 View command */
class InitViewCommand extends puremvc.SimpleCommand {
    public execute(notification: puremvc.INotification): void {
        const main: Main = notification.getBody() as Main;
        this.facade.registerMediator(new GameMediator(MediatorView[MediatorView.GAME_VIEW], main));
    }
}