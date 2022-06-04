export const mapCategory = {
  Romance: "Ngôn tình",
  Fiction: "Khoa học viễn tưởng",
  Arts: "Nghệ thuật",
  Computer: "Công nghệ thông tin",
  Management: "Quản lý",
  Physics: "Vật lý",
  Technology: "Kỹ thuật",
  Philosophy: "Triết học",
  Mathematics: "Toán học",
  Chemistry: "Hóa học",
  Electronics: "Điện tử",
  Language: "Ngôn ngữ",
  Others: "Khác",
};

export function getCategory(cat) {
  return mapCategory[cat];
}
