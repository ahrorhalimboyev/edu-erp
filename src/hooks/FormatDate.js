import moment from "moment";
export const FormatDate = (date) => {
  return moment(date).format("YYYY-MM-DD");
}
export const FormatDateAttendance=(date)=>{
  return moment(date).format("DD.MM")
}
