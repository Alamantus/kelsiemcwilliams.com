$(document).ready(function () {
  // Hide inactive pages
  $('#portfolio, #cv, #resume, #cv-employment, #cv-teaching, #cv-publications').hide();

  $('#about-button, #portfolio-button, #cv-button, #resume-button').click(function () {
    var pageName = $(this).attr('id').replace('-button', '');
    togglePage(pageName);
  });

  $('#cv-education-tab, #cv-employment-tab, #cv-teaching-tab, #cv-publications-tab').click(function () {
    var tabName = $(this).attr('id').replace('-tab', '');
    toggleCVSection(tabName);
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

function toggleCVSection (activateSection) {
  $('#cv-education, #cv-employment, #cv-teaching, #cv-publications').hide(400);
  $('#cv-education-tab, #cv-employment-tab, #cv-teaching-tab, #cv-publications-tab').removeClass('active');
  $('#' + activateSection).show(400);
  $('#' + activateSection + '-tab').addClass('active');
}