export default function getRefs() {
  return {
    searchForm: document.querySelector('.search-form'),
    // input: document.querySelector('searchQuery'),
    searchBtn: document.querySelector('button'),
    galleryList: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
  };
}
