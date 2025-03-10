export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const formattedDate = new Intl.DateTimeFormat("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    hour12: true, // 使用 12 小時制
  }).format(date);

  // 將日期部分的斜線替換為連字符
  return formattedDate.replace(/\//g, "-");
};

export const adjustDate = (dateString: string) => {
  const date = new Date(dateString);
  date.setDate(date.getDate() - 1); // 日期減一天
  return date.toISOString().split("T")[0]; // 格式化為 YYYY-MM-DD
};
