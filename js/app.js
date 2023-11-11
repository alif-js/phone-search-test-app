const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit)
}

const displayPhones = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    // display 6 phones only
    const loadMore = document.getElementById('load-more');
    if (dataLimit && phones.length > 6) {
        phones = phones.slice(0, 6);
        loadMore.classList.remove('d-none');
    }
    else {
        loadMore.classList.add('d-none');
    }

    // display no items found
    const notFoundMsg = document.getElementById('not-found-msg');
    if (phones.length === 0) {
        notFoundMsg.classList.remove('d-none');
    }
    else {
        notFoundMsg.classList.add('d-none');
    }

    // display all phones
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add = 'col';
        phoneDiv.innerHTML = `
        <div class="card p-4">
        <img style="width: 70%" src="${phone.image}" class="card-img-top mx-auto" alt="...">
            <div class="card-body text-center">
                <h5 class="card-title my-4">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional
                    content. This content is a little bit longer.</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary mx-4"  data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneDiv);
    });
    // stop spinner
    toggleSpinner(false);
}

// search process handler
const searchProcess = (dataLimit) => {
    // start spinner
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}

// search button click handler
document.getElementById('btn-search').addEventListener('click', function () {
    searchProcess(6);
});

// enter key button handler
document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchProcess(6);
    }
});

const toggleSpinner = isLoading => {
    const spinnerSection = document.getElementById('spinner');
    if (isLoading) {
        spinnerSection.classList.remove('d-none');
    }
    else {
        spinnerSection.classList.add('d-none');
    }
}

// load more button click handler
document.getElementById('btn-load-more').addEventListener('click', function () {
    searchProcess();
})

const loadPhoneDetails = async slug => {
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone =>{
    console.log(phone);
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name;
    const modalDetails = document.getElementById('modal-details');
    modalDetails.innerHTML = `
        <p>${phone.releaseDate ? phone.releaseDate : 'No release date found.'}</p>
        <p>${phone.mainFeatures.storage ? phone.mainFeatures.storage : 'No info found.'}</p>
    `;
}