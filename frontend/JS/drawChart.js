import { updateTotal } from './getAmount.js';

google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

export async function drawChart() {
    const { income, expenses } = await updateTotal();

    const data = google.visualization.arrayToDataTable([
        ['Type', 'Amount'],
        ['Income', income],
        ['Expenses', expenses]
    ]);

    const options = {
  title: 'Your Finances',
  titleTextStyle: {
    fontSize: 30,   // title size
    bold: true
  },
  legend: {
    textStyle: { fontSize: 20 }  // legend text size
  },
  pieSliceTextStyle: {
    fontSize: 18   // labels on the slices
  }
};


    const chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
}
