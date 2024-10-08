import { getDeals } from "./api/api.ts";
import "./style.css";
import { TGeneralResponse } from "./types/apiTypes.ts";

document.addEventListener("DOMContentLoaded", () => {
  getDeals(3, 1).then((response: TGeneralResponse) => {
    console.log("res", response);
  });
});
