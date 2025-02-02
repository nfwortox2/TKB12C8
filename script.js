let isDataReady = false; // Thêm biến cờ

// Hàm fetch và điền dữ liệu
function fetchAndFillTable() {
    Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    };
    const startDate = new Date("2024-09-09:00:000:+7");
    const endDate = new Date();
    const timeDifference = Math.abs(endDate.addDays(1) - startDate);
    const weeks = Math.ceil(timeDifference / (1000 * 60 * 60 * 24 * 7)) - 1;

    fetch(`https://api.codetabs.com/v1/proxy/?quest=https://thpt-tpdbp-dienbien.edu.vn/tkb_2024_2025/${weeks}/tkb_2bclass_30.html`)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const doctable = doc.querySelector('tbody');
            const tableHeader = doctable.rows[0];

            // Điền header
            const targetHeader = document.getElementById("tableHead");
            targetHeader.innerHTML = ''; // Xóa header cũ
            for (let i = 0; i < tableHeader.cells.length; i++) {
                const th = document.createElement('th');
                th.textContent = tableHeader.cells[i].textContent;
                targetHeader.appendChild(th);
            }

            // Điền dữ liệu vào các hàng
            const targetTableBody = document.getElementById('tableBody');
            targetTableBody.innerHTML = ''; // Xóa dữ liệu cũ

            for (let i = 1; i < doctable.rows.length; i++) {
                const sourceRow = doctable.rows[i];
                const targetRow = document.createElement('tr');

                for (let j = 0; j < sourceRow.cells.length; j++) {
                    const td = document.createElement('td');
                    td.textContent = sourceRow.cells[j].textContent;
                    targetRow.appendChild(td);
                }

                targetTableBody.appendChild(targetRow);
            }

            isDataReady = true; // Đánh dấu dữ liệu đã sẵn sàng
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Gọi hàm fetch khi trang tải xong
window.onload = fetchAndFillTable;