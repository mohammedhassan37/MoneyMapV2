import { updateTotal } from './getAmount.js';

google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

export async function drawChart() {
    const totalIncome = await updateTotal();

    const data = google.visualization.arrayToDataTable([
        ['Task', 'Cash'],
        ['Income', totalIncome],
        ['Expenses', 7]
    ]);

    const options = {
        title: 'My Finances'
    };

    const chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
}
