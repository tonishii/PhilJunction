import moment from "moment";

export function handleDate(datePosted: Date) {
  return moment(datePosted).fromNow();
}
