document.querySelector(".title").innerHTML = " Covid 19 <br> Data";

const fetchParams = {
  method: "GET",
  mode: "cors",
  cache: "default",
  redirect: 'follow',
  credentials: 'same-origin',
  headers: {

    "X-Access-Token": "5cf9dfd5-3449-485e-b5ae-70a60e997864",
    "Server": "nginx/1.17.10 (Ubuntu)",
    "Date": "Fri, 24 Apr 2020 07:07:48 GMT",
    "Content-Type": "application/json;charset=UTF-8",
    "Transfer-Encoding": "chunked",
    "Connection": "keep-alive",
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
};
// https://covid19-api.org/
var url = "https://covid19-api.org/api/status";

fetch(url, fetchParams)
  //tjekker om fetch'en er succesfuld
  .then(res => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  })
  // manipulere data'en
  .then(data => {
    const characters = data;
    console.log(characters);
    let characterData = [];
    //går igennem data'en, en efter en
    characters.forEach(function(character) {
      //skubber data'en ind i det tomme array
      characterData.push([character.country, parseInt(character.deaths)]);
    });


    // ZingChart Libary───────────────────────────────────────────────────────────
    const chartOneData = {
      type: "bar3d",
      //isometrisk udseende
      '3d-aspect': {
        true3d: false
      },
      title: {
        text: "",
        adjustLayout: true,
        color: "#fff"
      },
      tooltip: {
        text: 'Name: %kt<br>Height: %vvcm',
        color: "#fff"
      },
      scaleX: {
        label: {
          text: 'Characters',
          color: "#fff"
        },
        item: {
          angle: '-45'
        }
      },
      scaleY: {
        label: {
          text: 'Height In CM',
          color: "#fff"
        }
      },
      //ændre grafen's baggrunds farve
      "background-color": "#090909",
      "guide": {
        "visible": 0
      },
      //ændre farven på kolonnerne
      plot: {
        facets: {
          front: { 'background-color': "#000 #0055BF" },
          right: { 'background-color': "#3EA4F9 #0055BF" },
          left: { 'background-color': "#3EA4F9 #0055BF" },
          top: { 'background-color': "white" },
          bottom: { 'background-color': "white" }
        }
      },
      series: [{
        values: characterData
      }],
      plotarea: {
        margin: 'dynamic'
      }
    };
    zingchart.render({
      id: "chart-one",
      data: chartOneData,
      height: "100%",
      width: "100%"
    });
  })
  .catch(err => {
    console.log("Error Getting Data From Star Wars API");
  });