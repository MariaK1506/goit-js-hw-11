import axios from 'axios';

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  fetchImages() {
    console.log(this);
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '27971983-b3c7a3ee1797ece32c4360e82';
    const params = `?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;

    // & page=${ page }

    fetch(`${BASE_URL}${params}`)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        this.incrementPage();
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

async function fetchImages(value, page) {
  //   const BASE_URL = 'https://pixabay.com/api/';
  //   const API_KEY = '27971983-b3c7a3ee1797ece32c4360e82';
  //   const params = `?key=${API_KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;
  //   return fetch(`${BASE_URL}${params}`)
  //     .then(response => response.json())
  //     .then(console.log);
  //   return await axios
  //     .get(`${BASE_URL}${params}`)
  //     .then(response => response.json())
  //     .then(console.log);
}
