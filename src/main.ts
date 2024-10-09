import { getDealById, getDeals } from "./api/api.ts";
import "./style.css";
import { TDeal, TGeneralResponse } from "./types/apiTypes.ts";
import { DEALS_LIMIT, DEALS_REQUEST_TIMEOUT } from "./utils/constants.ts";
import { getDateAsString } from "./utils/converDateHelper.ts";
import { getStatusColor } from "./utils/getStatusColorHelper.ts";

const fetchDeals = async () => {
  const deals: TDeal[] = [];

  async function sendRequest(limit: number, page: number) {
    const response: TGeneralResponse = await getDeals(limit, page);

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
  const loaderTemplate = document.getElementById(
    "loaderTemplate"
  ) as HTMLTemplateElement;
  const loaderFragment = document.importNode(loaderTemplate.content, true);
  const app = document.getElementById("app")!;
  app.appendChild(loaderFragment);

  const loader = document.getElementById("loader")!;
  const dealsTable = document.getElementById("dealsTable")!;
  const tableBody = dealsTable.getElementsByClassName("tableBody")[0];
  const dealTemplate = document.getElementById(
    "dealTemplate"
  ) as HTMLTemplateElement;
  const taskTemplate = document.getElementById(
    "taskTemplate"
  ) as HTMLTemplateElement;

  const deals = await fetchDeals();

  loader.classList.add("hidden");
  dealsTable.classList.remove("hidden");

  let currentRow: HTMLTableRowElement | null = null;
  let originalDealRow: HTMLElement | null = null;

  tableBody.addEventListener("click", async (event) => {
    const clickedRow = (event.target as HTMLElement).closest("tr");

    if (!clickedRow || !clickedRow.classList.contains("dealRow")) return;

    if (currentRow && originalDealRow) {
      tableBody.replaceChild(originalDealRow, currentRow);
    }

    originalDealRow = clickedRow.cloneNode(true) as HTMLElement;

    const detailsRow = document.createElement("tr");
    const detailsColumn = document.createElement("td");
    detailsColumn.colSpan = 3;

    detailsRow.classList.add("loaderRow");
    detailsColumn.classList.add("dataLoader");

    const loaderFragment = document.importNode(loaderTemplate.content, true);
    const svgElement = loaderFragment.querySelector("svg");

    if (svgElement) {
      svgElement.setAttribute("width", "2em");
      svgElement.setAttribute("height", "2em");
    }

    detailsColumn.appendChild(loaderFragment);
    detailsRow.appendChild(detailsColumn);

    clickedRow.replaceWith(detailsRow);

    currentRow = detailsRow;

    const dealId = clickedRow.querySelector(".dealId")?.textContent;
    const response: TDeal = await getDealById(dealId!.toString());

    const taskRow = document.importNode(taskTemplate.content, true)
      .firstElementChild as HTMLTableRowElement;
    const taskName = taskRow.querySelector(".taskName") as HTMLElement;
    const taskId = taskRow.querySelector(".taskId") as HTMLElement;
    const taskDate = taskRow.querySelector(".taskDate") as HTMLElement;
    const taskStatus = taskRow.querySelector(".taskStatus") as HTMLElement;
    const taskStatusCircle = taskStatus.querySelector(
      ".taskStatusCircle"
    ) as HTMLElement;

    taskName.textContent = response.name;
    taskId.textContent = response.id.toString();
    taskDate.textContent = getDateAsString(response.closest_task_at);
    taskStatusCircle.style.fill = getStatusColor(response.closest_task_at);

    detailsRow.replaceWith(taskRow);

    currentRow = taskRow;
  });

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
