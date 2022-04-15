/**初始化 Controller command */
class InitControllerCommand extends puremvc.SimpleCommand {
    public execute(notification: puremvc.INotification): void {
        this.facade.registerCommand(NotificationEvent[NotificationEvent.GAME_START_EVENT], GameStartCommand)
        this.facade.registerCommand(NotificationEvent[NotificationEvent.GAME_SPIN_EVENT], GameSpinCommand)
        this.facade.registerCommand(NotificationEvent[NotificationEvent.GAME_CHEAT_EVENT], GameCheatCommand)

        this.sendNotification(NotificationEvent[NotificationEvent.INIT_EVENT])
    }
}