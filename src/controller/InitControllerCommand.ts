/**初始化 Controller command */
class InitControllerCommand extends puremvc.SimpleCommand {
    public execute(notification: puremvc.INotification): void {
        this.facade.registerCommand(Notification.GAME_START_EVENT, GameStartCommand)
        this.facade.registerCommand(Notification.GAME_SPIN_EVENT, GameSpinCommand)
        this.facade.registerCommand(Notification.GAME_CHEAT_EVENT, GameCheatCommand)

        this.sendNotification(Notification.INIT_EVENT)
    }
}