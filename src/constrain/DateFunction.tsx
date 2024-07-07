import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs().format();

export function DateFunction({ date }: { date: string | undefined }) {
  return dayjs(date).format("YYYY-MM-DD");
}
