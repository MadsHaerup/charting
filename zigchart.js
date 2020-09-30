document.querySelector(".title").innerHTML = " Star Wars <br> Data";
const fetchParams = {
  method: "GET",
  mode: "cors",
  cache: "default",
};

var url = "https://swapi.dev/api/people";

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
    const characters = data.results;
    console.log(characters);
    let characterData = [];
    //går igennem data'en, en efter en
    characters.forEach(function(character) {
      //skubber data'en ind i det tomme array
      characterData.push([character.name, parseInt(character.height)]);
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









document.querySelector("#changeData").addEventListener("click", function() {
  url = "https://swapi.dev/api/starships";
  console.log(url);
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
      const characters = data.results;
      console.log(characters);
      let characterData = [];
      //iterere over data'en
      characters.forEach(function(character) {
        //skubber data'en ind i det tomme array
        characterData.push([character.name, parseInt(character.passengers)]);
      });


      // ZingChart Libary───────────────────────────────────────────────────────────
      const chartOneData = {
        type: "bar3d",
        //isometrisk udseende
        '3d-aspect': {
          true3d: false
        },
        title: {
          text: "Fetch Star Wars",
          adjustLayout: true,
          color: "#fff"
        },
        tooltip: {
          text: 'Name: %kt<br>Height: %vv',
          color: "#fff"
        },
        scaleX: {
          label: {
            text: 'Name of starships',
            color: "#fff"
          },
          item: {
            angle: '-45'
          }
        },
        scaleY: {
          label: {
            text: 'Amount of passengers',
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

})