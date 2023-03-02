//Adding the mapbox token from my mapbox account 
mapboxgl.accessToken = 'pk.eyJ1IjoiaGVpc2VuemlsbGEiLCJhIjoiY2xjcXlmaHlqMGE5eTNwbjJsZDhxODhpMSJ9.Ib4qz6M3pZ7pBDGXJr8DiA'

//Adding the map itself 
const map = new mapboxgl.Map ({
    container: 'map',
    style: 'mapbox://styles/heisenzilla/cleg0trsv002001s135zy7mr3',
    center: [-79.347015, 43.651070],
    zoom: 10,
});

//Adding the source data from my published website in GITHUB
