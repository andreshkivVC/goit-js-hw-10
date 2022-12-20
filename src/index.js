import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchCountries from '../src/fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('input#search-box');
const contryListRef = document.querySelector('.country-list');
const contryInfoRef = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(searchContry, DEBOUNCE_DELAY));

function searchContry(e) {
  const inputValue = e.target.value.trim();
  console.log(inputValue);

  console.log();
  if (inputValue === '') {
    return;
  }

  fetchCountries(inputValue)
    .then(items => createCountryList(items))
    .catch(err => {
      console.log(err);
    });
}

function createCountryList(countries) {
  const markupCountriesList = countries
    .map(
      ({ name, flags }) =>
        `<li class="country">
        <img width="40" heinght="40" src="${flags.svg}"   
        alt="Flag of ${name.official}"/>
        <h1>${name.official}</h1></li>   
        `
    )
    .join('');
  contryListRef.innerHTML = '';
  contryListRef.insertAdjacentHTML('beforebegin', markupCountriesList);
}

function render(countryData) {
  contryListRef.innerHTML = '';
  const DataEl = countryData
    .map(
      ({ name: { official }, flags: { svg } }) =>
        `<li class="country"><img src="${svg}"
      alt="Flag of ${official}" />
      <h2>${official}</h2>
      </li>`
    )
    .join('');

  console.log(countryData.length);

  contryListRef.insertAdjacentHTML('beforeend', DataEl);
  contryInfoRef.innerHTML = '';

  if (countryData.length === 1) {
    contryInfoRef.innerHTML = '';
    const DataOneEl = countryData.map(
      ({ name, flags, capital, population, languages }) =>
        `<li class="country"><img src="${svg}"
      alt="Flag of ${official}" />
      <h1>${official}</h1>
      </li>
    <p class="text"><b>Capital:</b>${capital}</p>;
    <p class="text"><b>Population:</b>${population}</p>;
    <p class="text"><b>Languages:</b>${languages}</p>;
      `
    );
    contryInfoRef.insertAdjacentHTML('beforeend', DataOneEl.join(''));
    contryListRef.innerHTML = '';
  } else if (countryData.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    contryListRef = '';
  }
}
