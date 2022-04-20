/**遊戲音效 */
class GameSound {
    private sound: egret.Sound;
    private soundChannel: egret.SoundChannel;
    public constructor(type: string, url: string) {
        this.sound = new egret.Sound();
        this.sound.type = type;
        this.load(url);
    }

    /**載入音效 */
    private load(url: string): void {
        this.sound.once(egret.Event.COMPLETE, () => {
            const soundChannel: egret.SoundChannel = this.sound.play();
            soundChannel.stop();
            this.soundChannel = soundChannel;
        }, this);
        this.sound.once(egret.IOErrorEvent.IO_ERROR, (e: egret.IOErrorEvent) => {
            console.error('load sound error:', url);
        }, this);
        this.sound.load(url);
    }

    /**播放音效 */
    public onPlay(position: number = 0, loops: number = 0, isContinue: boolean = true): void {
        if (isContinue) {
            if (this.soundChannel && this.soundChannel.position !== 0) {
                this.sound.once(egret.Event.SOUND_COMPLETE, () => {
                    this.soundChannel = this.sound.play(position, loops);
                }, this)
                this.soundChannel = this.sound.play(this.soundChannel.position, 1);
                return;
            }
        }

        this.soundChannel = this.sound.play(position, loops);
    }

    /**停止播放音效 */
    public onStop(): void {
        this.soundChannel.stop();
    }
}