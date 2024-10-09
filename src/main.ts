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

  deals.forEach((deal: TDeal) => {
    const dealRow = document.importNode(dealTemplate.content, true);

    const name = dealRow.querySelector(".dealName") as HTMLElement;
    const budget = dealRow.querySelector(".dealBudget") as HTMLElement;
    const id = dealRow.querySelector(".dealId") as HTMLElement;

    name.textContent = deal.name;
    budget.textContent = deal.price.toString();
    id.textContent = deal.id.toString();

    const rowElement = dealRow.querySelector(".dealRow") as HTMLTableRowElement;

    rowElement?.addEventListener("click", async (event) => {
      const clickedRow = (event.currentTarget as HTMLTableRowElement).closest(
        "tr"
      );

      if (currentRow && originalDealRow) {
        tableBody.replaceChild(originalDealRow, currentRow);
      }

      originalDealRow = clickedRow!.cloneNode(true) as HTMLElement;

      const loaderRow = document.createElement("tr");
      loaderRow.classList.add("loaderRow");
      loaderRow.innerHTML = `
        <td class="dataLoader" colspan="3">
          <div class="loader">
            <svg
              viewBox="0 0 1024 1024"
              focusable="false"
              width="2em"
              height="2em"
              fill="#1677ff"
              aria-hidden="true"
            >
              <path
                d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"
              ></path>
            </svg>
          </div>
        </td>
      `;

      clickedRow?.replaceWith(loaderRow);

      currentRow = loaderRow;

      const response: TDeal = await getDealById(deal.id.toString());

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

      loaderRow.replaceWith(taskRow);

      currentRow = taskRow;
    });

    tableBody.appendChild(dealRow);
  });
});
