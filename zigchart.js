const fetchParams = {
  method: "GET",
  mode: "cors",
  cache: "default"
};

const url = "https://swapi.py4e.com/api/people/";

fetch(url, fetchParams)
  .then(res => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  })
  .then(data => {
    const characters = data.results;
    let characterData = [];
    characters.forEach(function(character) {
      characterData.push([character.name, parseInt(character.height)]);
    });
    const chartOneData = {
      type: "bar",
      title: {
        text: "Fetch + REST API Endpoint Demo",
        adjustLayout: true
      },
      tooltip: {
        text: 'Name: %kt<br>Height: %vvcm'
      },
      scaleX: {
        label: {
          text: 'Characters'
        },
        item: {
          angle: '-45'
        }
      },
      scaleY: {
        label: {
          text: 'Height In CM'
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