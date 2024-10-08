import { getDeals } from "./api/api.ts";
import "./style.css";
import { TDeal, TGeneralResponse } from "./types/apiTypes.ts";
import { DEALS_LIMIT, DEALS_REQUEST_TIMEOUT } from "./utils/constants.ts";

const fetchDeals = async () => {
  const deals: TDeal[] = [];

  async function sendRequest(limit: number, page: number) {
    const response: TGeneralResponse = await getDeals(limit, page);
    console.log(response._embedded.leads);
    deals.push(...response._embedded.leads);
    if (response._links.next) {
      // примитивное решение с отсрочкой следующего запроса на секунду, на самом деле это требование можно реализовать запоминая время отправки предыдущего запроса, в этом случае если отвт сервера длился более секунды, то следующий запрос отправляется сразу же
      await new Promise((resolve) =>
        setTimeout(resolve, DEALS_REQUEST_TIMEOUT)
      );
      await sendRequest(limit, page + 1);
    }
  }

  await sendRequest(DEALS_LIMIT, 1);

  return deals;
};

document.addEventListener("DOMContentLoaded", async () => {
  const loader = document.getElementById("loader")!;
  const dealsTable = document.getElementById("dealsTable")!;
  const tableBody = dealsTable.getElementsByClassName("tableBody")[0];
  const dealTemplate = document.getElementById(
    "dealTemplate"
  ) as HTMLTemplateElement;

  loader.classList.remove("hidden");

  const deals = await fetchDeals();

  loader.classList.add("hidden");
  dealsTable.classList.remove("hidden");

  deals.forEach((deal: TDeal) => {
    const dealRow = document.importNode(dealTemplate.content, true);

    const name = dealRow.querySelector(".dealName") as HTMLElement;
    const budget = dealRow.querySelector(".dealBudget") as HTMLElement;
    const id = dealRow.querySelector(".dealId") as HTMLElement;

    name.textContent = deal.name;
    budget.textContent = deal.price.toString();
    id.textContent = deal.id.toString();

    tableBody.appendChild(dealRow);
  });
});
