import axios from 'axios';
import getRefs from './get-refs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = getRefs();
const axios = require('axios');

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.totalPages = null;
    this.per_page = 40;
  }

  async fetchImages() {
    try {
      const BASE_URL = 'https://pixabay.com/api/';
      const API_KEY = '27971983-b3c7a3ee1797ece32c4360e82';
      const params = `?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.per_page}&page=${this.page}`;

      return await axios
        .get(`${BASE_URL}${params}`)
        .then(response => response.data)
        .then(({ hits, totalHits }) => {
          this.totalPages = Math.ceil(totalHits / this.per_page);

          if (this.page === 1 && totalHits >= 1) {
            Notify.success(`Hooray! We found ${totalHits} images.`);
          }

          if (this.page === this.totalPages) {
            setTimeout(() => {
              refs.loadMoreBtn.classList.add('is-hidden');
            }, 0);

            Notify.failure(
              'Were sorry, but youve reached the end of search results.'
            );
          }
          // if (totalHits - 40 * this.page <= 40) {
          //   setTimeout(() => {
          //     refs.loadMoreBtn.classList.add('is-hidden');
          //   }, 0);

          //   Notify.failure(
          //     'Were sorry, but youve reached the end of search results.'
          //   );
          // }
          if (totalHits === 0) {
            return Notify.failure(
              'Sorry, there are no images matching your search query. Please try again.'
            );
          }

          this.incrementPage();

          return hits;
        });
    } catch (error) {
      console.log(error.message);
    }
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
