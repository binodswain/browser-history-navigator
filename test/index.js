'use strict';

const browserHistoryNav = require('../index');
const routes = require('./routes.json');

let index = -1;
let data = null;
let div = document.getElementById('datasection');

let browser_history = new browserHistoryNav({
    updateDataFunc: setData
})

function fetchData(url) {
    fetch(url)
        .then(response => response.json())
        .then(json => {
            data = json;
            updateUI();
            browser_history.updateHistory(routes[index])
        })
}


function setData(new_data) {
    console.log("new_data", new_data);
    data = new_data;
    updateUI();
}

function updateUI() {
    div.innerHTML = JSON.stringify(data, null, 4);
}

function goNext() {
    index++;
    if (index==4) {
        return
    }
    fetchData(routes[index]['fetchurl'] || routes[index]['url']);
}

let button = document.getElementById('continue');

button.addEventListener('click', goNext);

