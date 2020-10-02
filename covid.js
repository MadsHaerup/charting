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

        if (Country.TotalDeaths < 10000) return;
        //skubber data'en ind i det tomme array
        covidData.push([Country.Country, parseInt(Country.TotalDeaths)]);
        console.log(Country);

    });
    console.log(covidData);
    // ────────────────────────────────────────────────────────────────────────────────

    // ZingChart Libary───────────────────────────────────────────────────────────
    var chartOneData = {
        "type": "bar3d",
        '3d-aspect': {
            "true3d": "false",
            "angle": "0",
            'x-angle': "0",
            'y-angle': "0",
            'z-angle': "0",
        },
        "title": {
            "text": "",
            "adjustLayout": true,
            "color": "#000"
        },
        "tooltip": {
            "text": 'Country: %kt<br>Total Deaths: %vv',
            "color": "#144552",
            "background.color": "#fff"
        },
        "preview": {
            "height": "10%",
            "width": "100%",
            "x": "8%",
            "y": "0%",

        },
        "scroll-y": {
            "handle": {
                "background-color": "#144552",
                "alpha": "0.5",
                "border-radius": "10px",
                "height": "10px" //scroll-x only
            },
            "bar": {
                "alpha": "0.5",
                'background-color': "#fff",
                'border-radius': "2px",
                "height": "50px", //scroll-x only
            },
        },
        "scroll-x": {
            "handle": {
                "background-color": "#144552",
                "alpha": "0.5",
                "border-radius": "10px",
                "height": "10px" //scroll-x only
            },
            "bar": {
                "alpha": "0.5",
                'background-color': "#fff",
                'border-radius': "2px",
                "height": "50px", //scroll-x only
            },

        },

        "scale-x": {
            "zooming": true,
            "zoom-to": [0, 50],
            "item": {
                "font-size": 10
            },
            "label": {
                "text": 'Countries',
                "color": "#000",
            },
        },
        "scale-y": {
            "zooming": true,
            "zoom-to": [0, 200000],
            "item": {
                "font-size": 10
            },
            "label": {
                "text": 'Total Deaths',
                "color": "#000",
            }
        },
        "plot": {
            "background-color": "#fff",
            "bar-width": "50%",
            facets: {
                front: { 'background-color': "#000 #0055BF" },
                right: { 'background-color': "#3EA4F9 #0055BF" },
                left: { 'background-color': "#3EA4F9 #0055BF" },
                top: { 'background-color': "white" },
                bottom: { 'background-color': "white" }
            },
            animation: {
                effect: "ANIMATION_SLIDE_LEFT"
            },
        },

        "series": [{
            "values": covidData
        }],
        "plotarea": {
            "margin": 'dynamic'
        }

    };

    zingchart.render({
        id: "chart-one",
        data: chartOneData,
        height: "90%",
        width: "90%"
    });
    document.querySelector("#changeData").addEventListener("click", function() {
        chartOneData["type"] = "line";
        zingchart.render({
            id: "chart-one",
            data: chartOneData,
            height: "90%",
            width: "90%"
        });
    });
    console.log(chartOneData);
    document.querySelector("#radar").addEventListener("click", function() {
        chartOneData["type"] = "radar";
        zingchart.render({
            id: "chart-one",
            data: chartOneData,
            height: "90%",
            width: "90%"
        });
    });
    document.querySelector("#bar3d").addEventListener("click", function() {
        chartOneData["type"] = "bar3d";
        zingchart.render({
            id: "chart-one",
            data: chartOneData,
            height: "90%",
            width: "90%"
        });
    });
    document.querySelector("#horizontalBar").addEventListener("click", function() {
        chartOneData["type"] = "hbar3d";
        chartOneData["tooltip"]["text"] = "Country: %kt<br>Total Deaths: %v"
        zingchart.render({
            id: "chart-one",
            data: chartOneData,
            height: "90%",
            width: "90%"
        });
    });
    document.querySelector("#line3d").addEventListener("click", function() {
        chartOneData["type"] = "line3d";
        zingchart.render({
            id: "chart-one",
            data: chartOneData,
            height: "90%",
            width: "90%"
        });
    });


})


// Promise ends─────────────────────────────────────────────────────────────

// Catching Errors───────────────────────────────────────────────────────────────
.catch(err => {
    console.log("Error Getting Data From Covide 19 API");
});