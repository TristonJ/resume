$(document).ready(function() {
  $('#fullpage').fullpage({
    navigation:false,
    fitToSectionDelay:200,
    scrollOverflow:true,
    onLeave: function(i, j, d) {
      var s = $('#fullpage .section');
      var c = $(s[i-1]).find('.expand-margin');
      var n = $(s[j-1]).find('.shrink-margin');
      if(j<i) {
        c.removeClass('expand-margin');
        c.addClass('shrink-margin');
      }
      n.removeClass('shrink-margin');
      n.addClass('expand-margin');
      setTimeout($.fn.fullpage.reBuild, 1000);
    }
  });
});
