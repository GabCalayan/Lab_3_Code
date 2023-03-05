//Adding the mapbox token from my mapbox account 
mapboxgl.accessToken = 'pk.eyJ1IjoiaGVpc2VuemlsbGEiLCJhIjoiY2xjcXlmaHlqMGE5eTNwbjJsZDhxODhpMSJ9.Ib4qz6M3pZ7pBDGXJr8DiA'

//SOURCE, STYLE and LAYER SECTION

//Adding the map itself 
const map = new mapboxgl.Map ({
    container: 'map',
    style: 'mapbox://styles/heisenzilla/cleg0trsv002001s135zy7mr3',
    center: [-79.347015, 43.651070],
    zoom: 10,
});

//Adding the source data from my published website in GITHUB
map.on('load', () => {

map.addSource('Public_art', {
    type: 'geojson',
    data: 'https://gabcalayan.github.io/Lab_3_Code/Public_Art.geojson',
    'generateId': true //Creating the ID for each feature
});

//Adding the data layer 
map.addLayer({
    'id': 'Toronto_Public_Points',
    'type': 'circle',
    'source': 'Public_art',
    'paint': {
        'circle-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            8, 10,
            10, 5
        ],
        'circle-color': [
            'step', //For this coloring section, I used https://htmlcolorcodes.com for my chosen colors
            ['get', '_id'],
            '#141513',
            1, '#629628',
            2, '#939628',
            3, '#963F28',
            4, '#962828',
            5, '#4DBC00',
            6, '#00BCA0',
            7, '#0F4867',
            8, '#160F67',
            9, '#4A0F67',
            10, '#670F4F', 
        ]

    },
        'filter':['<=', ['get', '_id'], 10] //Adding a filter because I don't all data points so that it's easier to look at (It was originally 400 points)
});


map.addLayer ({
    'id': 'Toronto_Public_Labels',
    'type': 'symbol',
    'source': 'Public_art',
    'layout': {
        'text-field': ['step', ['zoom'], "", 12, ['get', 'Title']], //Adding a step zoom function so that we can see the labels at a specific zoom value, rather than the default.
        'text-variable-anchor': ['bottom'],
        'text-radial-offset': 0.5,
        'text-justify': 'auto'
    },
    'paint': {
        'text-color': 'black'
},
    'filter':['<=', ['get', '_id'], 10] //Adding a filter because I don't all data points so that it's easier to look at 
    });

});


//INTERACTIVE SECTION 
//Adding the search control to the map 
map.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        countries: "ca"
    })
);

//Adding the zoom and rotation controls in the map for interactivity 
map.addControl(new mapboxgl.NavigationControl());

//Adding the fullscreen option in my map 
map.addControl(new mapboxgl.FullscreenControl());

//Adding simple click event just to check (it works)
map.on('click', 'Toronto_Public_Points', (e) => {
    console.log(e);
    let artistName = e.features[0].properties.Artist;
    console.log(artistName);
})

//Adding the pop -up click event for my layer 
map.on('mouseenter', 'Toronto_Public_Points', () => {
    map.getCanvas().style.cursor = 'pointer';
});

map.on('mouseleave', 'Toronto_Public_Points', () => {
    map.getCanvas().style.cursor = '';
});

map.on('click', 'Toronto_Public_Points', (e) => {
    new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML("<b>Artist:</b> " + e.features[0].properties.Artist + "<br>")
    .addTo(map);
});

//LEGEND SECTION 
//Creating 10 artist legend categories 
const legendlabels = [
    'Dion Zachariou',
    'Del Newbigging',
    'Marinane Lovink/Scott Eunson',
    'Susan Schelle/Mark Gomes',
    'Dereck Revington',
    'Adrienne Alison',
    'Oscar Nemon',
    'Unknown',
    'Laurie McGugan',
    'Yoshio Yagi' 
];

//Creating 10 legend colors for my 10 artist categories
const legendcolours = [
   '#629628',
   '#939628',
   '#963F28',
   '#962828',
   '#4DBC00',
   '#00BCA0',
   '#0F4867',
   '#160F67',
   '#4A0F67',
   '#670F4F' 
];

//Calling the legend from my HTML page
const legend = document.getElementById('legend');


legendlabels.forEach((label,i) => { //For each legend label that we made earlier, we are going to do these lines of code below
    const color = legendcolours[i]; //For each legend label we made, use the colors we have I created in order

    const item = document.createElement('div'); //Creating a constant variable called item where our legend labels will be placed in
    const key = document.createElement('span'); 

    key.className = 'legend-key'; //Referring to the CSS file, we are going to grab our styles from this 
    key.style.backgroundColor = color; 

    const value = document.createElement('span');
    value.innerHTML = `${label}`;

    item.appendChild(key);
    item.appendChild(value);
    
    legend.appendChild(item);
});