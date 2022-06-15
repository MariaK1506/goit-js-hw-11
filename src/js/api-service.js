import axios from 'axios';
import getRefs from './get-refs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// const BASE_URL = 'https://pixabay.com/api/';
// const API_KEY = '27971983-b3c7a3ee1797ece32c4360e82';
// const params = `?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=100&page=${this.page}`;

const refs = getRefs();

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '27971983-b3c7a3ee1797ece32c4360e82';
    const params = `?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;

    return await axios
      .get(`${BASE_URL}${params}`)
      .then(response => response.data)
      .then(({ hits, total, totalHits }) => {
        if (this.page === 1) {
          Notify.success(`Hooray! We found ${totalHits} images.`);
        }

        if (totalHits - 40 * this.page <= 40) {
          refs.loadMoreBtn.classList.add('is-hidden');
          Notify.failure(
            'Were sorry, but youve reached the end of search results.'
          );
        }
        if (totalHits === 0) {
          return Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
        this.incrementPage();

        return hits;
      });
  }

  // onFirstPageNotify() {
  //   if (this.page === 1) {
  //     console.log('TotalHits', this.totalHits);
  //     Notify.success(`Hooray! We found ${this.totalHits} images.`);
  //   }
  // }

  // noMorePages() {
  //   refs.loadMoreBtn.classList.add('is-hidden');
  //   Notify.failure('Were sorry, but youve reached the end of search results.');
  // }

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
