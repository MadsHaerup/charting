document.querySelector(".title").innerHTML = " Covid 19 <br> Stats";
// ────────────────────────────────────────────────────────────────────────────────

const fetchParams = {
    method: "GET",
    redirect: 'follow',
    headers: {
        //adgangs nøglen
        "X-Access-Token": "5cf9dfd5-3449-485e-b5ae-70a60e997864",

    },
};
// ────────────────────────────────────────────────────────────────────────────────

// https://covid19-api.org/
var url = "https://api.covid19api.com/summary";

fetch(url, fetchParams)
    //tjekker om fetch'en er succesfuld
    .then(res => {
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        return res.json();
    })
    // ────────────────────────────────────────────────────────────────────────────────

// manipulere data'en
.then(data => {
        const objects = data;
        console.log(objects.Global);
        let covidData = [];
        //går igennem data'en, en efter en
        objects.Countries.forEach(function(Country, index) {
            //retunere 9 objekter
            //if (index > 9) return;
            //skubber data'en ind i det tomme array
            covidData.push([Country.Country, parseInt(Country.TotalDeaths)]);
            console.log(Country);

        });
        console.log(covidData);
        // ────────────────────────────────────────────────────────────────────────────────


        // ZingChart Libary───────────────────────────────────────────────────────────
        var chartOneData = {
            "type": "line",
            "series": [{
                "values": covidData
            }, {
                "values": [5, 30, 21, 18, 59, 50, 28, 33]
            }, {
                "values": [30, 5, 18, 21, 33, 41, 29, 15]
            }]
        };
        zingchart.render({
            id: "chart-one",
            data: chartOneData,
            height: "90%",
            width: "90%"
        });
    })
    // Promise ends─────────────────────────────────────────────────────────────

// Catching Errors───────────────────────────────────────────────────────────────
.catch(err => {
    console.log("Error Getting Data From Covide 19 API");
});