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

  fetchImages() {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '27971983-b3c7a3ee1797ece32c4360e82';
    const params = `?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=3&page=${this.page}`;

    return fetch(`${BASE_URL}${params}`)
      .then(response => response.json())
      .then(({ hits, total, totalHits }) => {
        // console.log('Totalhits: ', totalHits);
        // console.log('Total', total);

        if (this.page === 1) {
          // console.log('TotalHits', totalHits);
          Notify.success(`Hooray! We found ${totalHits} images.`);
        }

        this.incrementPage();

        if (total === 0) {
          return Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }

        if (totalHits === total) {
          refs.loadMoreBtn.classList.add('is-hidden');
          Notify.failure(
            'Were sorry, but youve reached the end of search results.'
          );
        }

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
