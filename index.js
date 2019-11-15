function printParks(parks) {
    let html = ``;

    for(let i = 0; i < parks.data.length; i++) {
        html += preparePark(parks.data[i]);
    }

    $('.js-results').html(html);
}

function preparePark(park) {
    return `
    <div class="result">
        <h2>${park.fullName}</h2>
        <p>${park.description}</p>
        <a href="${park.url}">Park Page</a>
    </div>
    `
}

function formatParams(params) {
    return Object.keys(params).map(key => `${key}=${params[key]}`).join('&');
}

function getParks(state, amount) {
    let params = {
        api_key: "2jBBfHm2EHzfcaRaNYgO7rPz2ktqkyA1dc3ajRJc",
        limit: amount,
        stateCode: state
    }

    const queries = formatParams(params);
    const url = `https://developer.nps.gov/api/v1/parks?${queries}`;
    console.log(url);
    fetch(url)
    .then(park => park.json())
    .then(parkJson => {
        printParks(parkJson);
    });
}

function handleForm() {
    $('.js-form').on('submit', event => {
        event.preventDefault();

        const amount = $('#results').val();
        const state = $('#state').val();

        getParks(state, amount);
    });
}

function main() {
    handleForm();
}

$(main);