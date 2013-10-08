jQuery(document).ready(function($) {
  $('#example-response span.line').on('mouseover click', function(e) {
    var key, help;

    key = $(this).attr('data-key');
    help = definitions[key];
    $('p#help-text').html(help);
  })
});
