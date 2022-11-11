import moment from "moment";

export function dateFormat(unix) {
  unix = unix*1000
  let date = new Date(unix)
  return moment(date).format("YYYY-MM-DD HH:mm");
}
