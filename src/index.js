import getRefs from './js/get-refs';

import ApiService from './js/api-service';

const refs = getRefs();
const apiService = new ApiService();

refs.searchForm.addEventListener('submit', onSearchForm);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearchForm(event) {
  event.preventDefault();
  apiService.query = event.currentTarget.elements.searchQuery.value;
  apiService.resetPage();
  apiService.fetchImages();
}

function onLoadMore() {
  apiService.fetchImages();
}
