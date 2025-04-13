export default function convertMoney(money) {
  return Number(money)
    .toLocaleString("vi-VN", { style: "currency", currency: "VND" })
    .replace("₫", "");
}
