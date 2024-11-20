let pageIndex = 0;
const pageSize = 10;
let outOfRange = true;
const summaryPagination = document.getElementById("summary-pagination");
const mainBox = document.getElementById("invoice-table");
loadInvoices = async () => {
    const statusTemplate = `<span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                                                            __STATUS__
                                                        </span>`;
    const currentUserJson = getCookie("currentUser");
    const currentUser = JSON.parse(currentUserJson);
    
    const blogApi = new panelApi();
    loading();
    await blogApi.getAllByUserId(currentUser.id, pageIndex, pageSize, currentUser.token, function (data) {
        mainBox.innerHTML = "";
        if (data.length < pageSize) {
            outOfRange = true;
        }else {
            outOfRange = false;
        }
        for (let index = 0; index < data.length; index++) {
            let template = "";
            template += `<tr class="text-gray-700 dark:text-gray-400">`;
            template += `<td class="px-4 py-3 text-xs">`;
            template += statusTemplate.replace(/__STATUS__/g, data[index].status);
            template += `</td><td class="px-4 py-3 text-sm">`;
            template += `${/__ADDDATE__/g, data[index].addDate}`;
            template += `</td><td class="px-4 py-3 text-sm">`;
            template += `${/__ADDDATE__/g, data[index].addDate}`;
            template += `</td></tr>`;
            mainBox.innerHTML += template;
        }
    });
    summaryPagination.innerText = `showing ${pageSize * pageIndex + 1} - ${pageSize * pageIndex + pageSize}`;
}

nextPage = async () => {
    nextPage++;
    await loadInvoices();
    document.getElementById("current-page").innerText = (pageIndex + 1);
}

previousPage = async () => {
    if (pageIndex < 1) return;
    nextPage--;
    await loadInvoices();
    document.getElementById("current-page").innerText = (pageIndex + 1);
}

const loading = () => {
    let template = `<tr class="text-gray-700 dark:text-gray-400">
                                        <td class="px-4 py-3 text-sm">
                                        please wait...
                                        </td>
                                        </tr>`;
    mainBox.innerHTML += template;
}