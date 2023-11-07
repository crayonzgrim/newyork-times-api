import { DateTime } from "luxon";

export const dateFormat = (date: string) => {
  try {
    return DateTime.fromISO(date).setLocale("ko").toFormat("yyyy.M.dd (ccc)");
  } catch (err) {
    console.error(err);
  }
};

export const uniqueId = () => {
  return crypto.randomUUID();
};

export const changeLabelToKorean = (label: string) => {
  switch (label) {
    case "south-korea":
      return "대한민국";
    case "china":
      return "중국";
    case "japan":
      return "일본";
    case "america":
      return "미국";
    case "north-korea":
      return "북한";
    case "russia":
      return "러시아";
    case "france":
      return "프랑스";
    case "england":
      return "영국";
    default:
      return "";
  }
};

export const changeLabelToEnglish = (label: string) => {
  switch (label) {
    case "대한민국":
      return "south-korea";
    case "중국":
      return "china";
    case "일본":
      return "japan";
    case "미국":
      return "america";
    case "북한":
      return "north-korea";
    case "러시아":
      return "russia";
    case "프랑스":
      return "france";
    case "영국":
      return "england";
    default:
      return "";
  }
};
