/**App Start command */
class AppStartupCommand extends puremvc.MacroCommand {
    public initializeMacroCommand(): void {
        this.addSubCommand(InitModelCommand);
        this.addSubCommand(InitViewCommand);
        this.addSubCommand(InitControllerCommand);
    }
}