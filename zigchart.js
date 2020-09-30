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
            title: {
                text: "Fetch Starwars",
                adjustLayout: true
            },
            tooltip: {
                text: 'Name: %kt<br>Height: %vvcm'
            },
            "3d-aspect": {
                "x-angle": "-20",
                "y-angle": "15",
                "z-angle": "-2"
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
                title: {
                    text: "Fetch Starwars",
                    adjustLayout: true
                },
                tooltip: {
                    text: 'Name: %kt<br>Passengers: %vv'
                },
                "3d-aspect": {
                    "x-angle": "-20",
                    "y-angle": "15",
                    "z-angle": "-2"
                },
                scaleX: {
                    label: {
                        text: 'Name of starship'
                    },
                    item: {
                        angle: '-45'
                    }
                },
                scaleY: {
                    label: {
                        text: 'Passengers'
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