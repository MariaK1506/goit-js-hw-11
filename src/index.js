import { getRefs } from './js/get-refs';
import galleryTpl from './templates/galleryImages.hbs';
import { ApiService } from './js/api-service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = getRefs();
const apiService = new ApiService();
let lightbox;

refs.searchForm.addEventListener('submit', onSearchForm);
refs.loadMoreBtn.addEventListener('click', fetchHits);

hideLoadMoreBtn();

async function onSearchForm(event) {
  event.preventDefault();

  apiService.query = event.currentTarget.elements.searchQuery.value.trim();
  if (apiService.query === '') {
    return Notify.failure('What do you want to look for?');
  }
  apiService.resetPage();
  try {
    clearGalleryList();
    await fetchHits();
  } catch (error) {
    console.log(error.message);
  }
  // clearGalleryList();
  // fetchHits();
}

function fetchHits() {
  apiService.fetchImages().then(hits => {
    appendGalleryMarkup(hits);
    // showLoadMoreBtn();
    onScroll();
    lightbox.refresh();
  });
}

function appendGalleryMarkup(hits) {
  refs.galleryList.insertAdjacentHTML('beforeend', galleryTpl(hits));
  const options = {
    captions: true,
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
  };

  lightbox = new SimpleLightbox('.photo-card a', options);
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

function onScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
