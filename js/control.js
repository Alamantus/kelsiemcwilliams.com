var sitePages = [
  '#about-page',
  '#resume-page',
  '#portfolio-page',
  '#cv-page',
  '#hireme-page',
];
var cvPages = [
  '#cv-education',
  '#cv-employment',
  '#cv-teaching',
  '#cv-publications',
  '#cv-administration',
  '#cv-trainings',
  '#cv-development',
  '#cv-presentations',
  '#cv-volunteer',
];

$(document).ready(function () {
  // Hide inactive pages
  $(cvPages.slice(1).join(', ')).hide();
  $(sitePages.slice(1).join(', ')).hide(function () {
    if(document.location.hash){
      var targetPage = document.location.hash + '-page';
      if (sitePages.indexOf(targetPage) >= 0) {
        togglePage(targetPage.substr(1));
      }
    }
  });

  $(sitePages.map(mapPageButton).join(', ')).click(function () {
    var pageName = $(this).attr('id').replace('-button', '-page');
    var pageHash = pageName.replace('-page', '');
    togglePage(pageName);
    history.pushState({page: pageHash}, pageHash, '#' + pageHash);
  });

  $(cvPages.map(mapCVTabs).join(', ')).click(function () {
    var tabName = $(this).attr('id').replace('-tab', '');
    toggleCVSection(tabName);
  });

  $('#contact-send-button').click(function () {
    if (validateContactForm()) {
      $('#contact-form').submit();
      $('#contact-send-button').text('Sent!')
      .addClass('disabled');
    }
  });

  // Helper Popups
  $('#pagesPerHourHelper').popup();
  $('#copyEditingServiceModal').modal();
  $('.copyEditingServiceModalButton').click(function () {
    $('#copyEditingServiceModal').modal('show');
  });
});

function mapPageButton (item) {
  return item.replace('-page', '-button');
}

function mapCVTabs (item) {
  return item + '-tab';
}

function togglePage (activatePage) {
  var sitePagesExcludingActivated = sitePages.slice();
  var sectionIndex = sitePagesExcludingActivated.indexOf('#' + activatePage);

  if (sectionIndex >= 0) {
    sitePagesExcludingActivated.splice(sectionIndex, 1);
  }

  $(sitePagesExcludingActivated.join(', ')).hide(400);
  $(sitePagesExcludingActivated.map(mapPageButton).join(', ')).removeClass('active');

  $('#' + activatePage).show(400);
  $('#' + mapPageButton(activatePage)).addClass('active');
}

function toggleCVSection (activateSection) {
  var cvPagesExcludingActivated = cvPages.slice();
  var sectionIndex = cvPagesExcludingActivated.indexOf('#' + activateSection);

  if (sectionIndex >= 0) {
    cvPagesExcludingActivated.splice(sectionIndex, 1);
  }

  $(cvPagesExcludingActivated.join(', ')).hide(400);
  $(cvPagesExcludingActivated.map(mapCVTabs).join(', ')).removeClass('active');

  $('#' + activateSection).show(400);
  $('#' + activateSection + '-tab').addClass('active');
}

function validateContactForm () {
  var firstName = $('#contact-firstName').val().trim(),
    lastName = $('#contact-lastName').val().trim(),
    email = $('#contact-email').val().trim(),
    message = $('#contact-message').val().trim();

  $('#contact-errorMessage').html('').hide();

  if (firstName !== ''
      && email !== '' && email.match(/^.*@.*$/i)
      && message !== '') {
    $('#contact-firstName').val(firstName);
    $('#contact-lastName').val(lastName);
    $('#contact-email').val(email);
    $('#contact-message').val(message);

    return true;
  } else {
    var errorMessage = '';

    if (firstName === '') errorMessage += '<li>You must enter your first name</li>';
    if (email === '') errorMessage += '<li>You must enter an email address</li>';
    if (!email.match(/^.*@.*$/i)) errorMessage += '<li>You must enter a valid email address</li>';
    if (message === '') errorMessage += '<li>You must enter a message</li>';

    $('#contact-errorMessage').html('<p><ul class="ui list">' + errorMessage + '</ul></p>').show();
  }

  return false;
}
