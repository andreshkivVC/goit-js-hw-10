const endPoint = 'https://restcountries.com/v3.1/name/';
const filter = '?fields=name,capital,population,flags,languages';

export default function fetchCountries(name) {
  return fetch(`${endPoint}${name}${filter}`).then(res => {
    return res.json();
  });
}
