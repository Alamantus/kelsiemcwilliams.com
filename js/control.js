var sitePages = [
  '#about',
  '#portfolio',
  '#cv',
  '#resume',
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
  $(sitePages.slice(1).join(', ')).hide();
  $(cvPages.slice(1).join(', ')).hide();

  $(sitePages.map(mapPageButtons).join(', ')).click(function () {
    var pageName = $(this).attr('id').replace('-button', '');
    togglePage(pageName);
  });

  $(cvPages.map(mapCVTabs).join(', ')).click(function () {
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

function mapPageButtons (item) {
  return item + '-button';
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
  $(sitePagesExcludingActivated.map(mapPageButtons).join(', ')).removeClass('active');

  $('#' + activatePage).show(400);
  $('#' + activatePage + '-button').addClass('active');
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