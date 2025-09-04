export async function drawChart() {
    // Get the number from amountDisplayed
    const amountEl = document.getElementById('amountDisplayed');
    const totalIncome = parseFloat(amountEl.textContent.replace('£', '')) || 0;

    const data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['Income', totalIncome],
        ['Sleep', 7]
    ]);

    const options = {
        title: 'My Daily Activities'
    };

    const chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
}

// Load Google Charts once
google.charts.load('current', { packages: ['corechart'] });
