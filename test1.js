window.addEventListener('load', setup);

async function setup() {
    const ctx = document.getElementById('chart').getContext('2d');
    const usaDeaths = await getData();
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: usaDeaths.date,
            datasets: [{
                label: 'Deaths in america',
                data: usaDeaths.death,
                fill: false,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderWidth: 1
            }]
        },
        options: {}
    });
}

async function getData() {
    const response = await fetch('national-history.csv');
    const data = await response.text();
    const date = [];
    console.log(data);
    const death = [];
    //putter den rå data i en variable og splitter den op
    const rows = data.split('\n').slice(1);
    //går igennem hver rækkke i tabellen
    rows.forEach(row => {
        //splitter hver række ind i dens corresponding kolonne
        const cols = row.split(',');
        date.push(cols[0]);
        death.push(14 + parseFloat(cols[1]));
    });
    return { date, death };
}