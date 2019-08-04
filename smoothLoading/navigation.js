window.addEventListener('popstate', function() {
  loadNewPage(window.location.href, false);
});