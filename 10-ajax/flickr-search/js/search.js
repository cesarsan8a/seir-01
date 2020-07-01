const searchFlickr = function (keywords) {
  console.log('Searching Flickr for', keywords);

  const flickrURL = 'https://api.flickr.com/services/rest?jsoncallback=?'; // JSONP
  $.getJSON(flickrURL, {
    method: 'flickr.photos.search', // not to be confused with method="POST"
    api_key: '2f5ac274ecfac5a455f38745704ad084',
    text: keywords, // what we are actually searching for
    format: 'json'
  }).done(showImages);
};

const showImages = function (results) {
  _( results.photos.photo ).each(function (photo) {
    const thumbnailURL = generateURL(photo);
    const $img = $('<img>', {src: thumbnailURL});
    $img.appendTo('#images'); // $('images').append($img);
  });
};

const generateURL = function (p) {
  return [
    'http://farm',
    p.farm,
    '.static.flickr.com/',
    p.server,
    '/',
    p.id,
    '_',
    p.secret,
    '_q.jpg' // Change 'q' to something else for different sizes (see docs)
  ].join('');
};

$(document).ready(function () {
  $('#search').on('submit', function (event) {
    event.preventDefault(); // disabled the form submission
    const term = $('#query').val();
    searchFlickr(term);
  });
});