/**共用函數方法 */
class Global {
    /**隨機排序 */
    public static random(list: Array<any>, isClone: boolean = true): Array<any> {
        const arr = isClone ? [...list] : list;
        const length: number = list.length;
        for (let i: number = 0; i < length; i++) {
            const randomIndex: number = Math.floor(Math.random() * length);
            const obj: any = arr[i];
            arr[i] = arr[randomIndex]
            arr[randomIndex] = obj
        }

        return arr;
    }
}