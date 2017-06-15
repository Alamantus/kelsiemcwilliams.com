var sitePages = [
  '#about-page',
  '#resume-page',
  '#portfolio-page',
  '#cv-page',
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

  $(sitePages.map(mapPageButtons).join(', ')).click(function () {
    var pageName = $(this).attr('id').replace('-button', '-page');
    togglePage(pageName);
    document.location.hash = pageName.replace('-page', '');
  });

  $(cvPages.map(mapCVTabs).join(', ')).click(function () {
    var tabName = $(this).attr('id').replace('-tab', '');
    toggleCVSection(tabName);
  });

  $('#contact-button').click(function () {
    $('#contact')
    .modal({
      onApprove: function () {
        $('#contact-form').submit();
      },
    })
    .modal('show');
  });
});

function mapPageButtons (item) {
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