import getRefs from './js/get-refs';
import galleryTpl from './templates/galleryImages.hbs';
import ApiService from './js/api-service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = getRefs();
const apiService = new ApiService();

refs.searchForm.addEventListener('submit', onSearchForm);
refs.loadMoreBtn.addEventListener('click', fetchHits);

hideLoadMoreBtn();

function onSearchForm(event) {
  event.preventDefault();

  apiService.query = event.currentTarget.elements.searchQuery.value.trim();
  if (apiService.query === '') {
    return Notify.failure('What do you want to look for?');
  }
  apiService.resetPage();
  clearGalleryList();
  fetchHits();
}

function fetchHits() {
  apiService.fetchImages().then(hits => {
    appendGalleryMarkup(hits);
    showLoadMoreBtn();
    apiService.noMorePages();
  });
}

function appendGalleryMarkup(hits) {
  refs.galleryList.insertAdjacentHTML('beforeend', galleryTpl(hits));
}

function clearGalleryList() {
  refs.galleryList.innerHTML = '';
}

function hideLoadMoreBtn() {
  refs.loadMoreBtn.disabled = true;
  refs.loadMoreBtn.classList.add('is-hidden');
}

function showLoadMoreBtn() {
  refs.loadMoreBtn.classList.remove('is-hidden');
  refs.loadMoreBtn.disabled = false;
}
