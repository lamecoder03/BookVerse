document.addEventListener("DOMContentLoaded", function () {
  const searchLink = document.getElementById('openSearch');
  const searchBar = document.getElementById('navbarSearch');
  const closeBtn = document.getElementById('closeSearch');
  const input = searchBar.querySelector('input');

  function openSearch() {
    searchBar.classList.remove('d-none');
    searchBar.classList.add('show-search');
    input.focus();
  }

  function closeSearch() {
    searchBar.classList.remove('show-search');
    setTimeout(() => searchBar.classList.add('d-none'), 300);
  }

  searchLink.addEventListener('click', function (e) {
    e.preventDefault();
    if (searchBar.classList.contains('d-none')) openSearch();
    else closeSearch();
  });

  closeBtn.addEventListener('click', closeSearch);

  document.addEventListener('click', function (e) {
    if (!searchBar.contains(e.target) && !searchLink.contains(e.target)) {
      closeSearch();
    }
  });
});
