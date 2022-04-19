/**下注結果資料 */
class SpinResultDto {
    /**是否下注成功 */
    public isSpinSuccess: boolean;

    /**是否中獎 */
    public isWin: boolean;

    /**圖示 */
    public icon: number;

    /**下注額 */
    public bet: number;

    /**目前點數 */
    public credit: number;

    /**取得下注前點數 */
    public beforeBetOfCredit: number;

    /**取得下注後點數 */
    public afterBetOfCredit: number;

    /**取得結算輸贏 */
    public winLose: number;

    /**輸贏金額 */
    public bouns: number;

    /**訊息 */
    public message: string;

    public constructor(message: string = "", isSpinSuccess: boolean = false, isWin: boolean = false, icon: number = 0, bet: number = 0, credit: number = 0, bouns: number = 0, beforeBetOfCredit: number = 0, afterBetOfCredit: number = 0, winLose: number = 0) {
        this.message = message;
        this.isSpinSuccess = isSpinSuccess;
        this.isWin = isWin;
        this.icon = icon;
        this.bet = bet;
        this.credit = credit;
        this.beforeBetOfCredit = beforeBetOfCredit;
        this.afterBetOfCredit = afterBetOfCredit;
        this.winLose = winLose;
    }
}