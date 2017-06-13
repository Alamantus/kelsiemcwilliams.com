$(document).ready(function () {
  // Hide inactive pages
  $('#portfolio, #cv, #resume').hide();

  $('#about-button').click(function () {
    togglePage('about');
  });

  $('#portfolio-button').click(function () {
    togglePage('portfolio');
  });

  $('#cv-button').click(function () {
    togglePage('cv');
  });

  $('#resume-button').click(function () {
    togglePage('resume');
  });

  $('#contact-button').click(function () {
    $('#contact')
    .modal({
      onApprove: function () {
        console.log('sent!');
      },
    })
    .modal('show');
  });
});

function togglePage (activatePage) {
  $('#about, #portfolio, #cv, #resume').hide(400);
  $('#about-button, #portfolio-button, #cv-button, #resume-button').removeClass('active');
  $('#' + activatePage).show(400);
  $('#' + activatePage + '-button').addClass('active');
}