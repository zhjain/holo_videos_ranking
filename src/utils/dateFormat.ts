// 接受日期字符串并返回标准的日期字符串格式 yyyy/MM/dd HH:mm:ss
export function formatFullDateTime(dateTimeStr: string): string {
    const dateTime = new Date(dateTimeStr);
    const year = dateTime.getFullYear();
    const month = (dateTime.getMonth() + 1).toString().padStart(2, "0");
    const day = dateTime.getDate().toString().padStart(2, "0");
    const hours = dateTime.getHours().toString().padStart(2, "0");
    const minutes = dateTime.getMinutes().toString().padStart(2, "0");
    const seconds = dateTime.getSeconds().toString().padStart(2, "0");

    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}


// 接受日期字符串并返回标准的日期字符串格式 yyyy/MM/dd HH:mm:ss
export function formatDurationTime(totalSeconds: number): string {
    // 从总秒数中计算分钟
    const minutes = Math.floor(totalSeconds / 60);
    // 计算剩余的秒数
    const seconds = totalSeconds % 60;

    return `${minutes}m${seconds}s`;
}