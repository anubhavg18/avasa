// START RESPONSIVE NAV-LINK

$(document).ready(function(){
  $("#nav-link").click(function(){
    $("#nav-box").show();
  });
  $("#nav-link2").click(function(){
    $("#nav-box").hide();
  });
});
// END RESPONSIVE NAV-LINK

// START CHATBOT

$(document).ready(function(){
  $("#chatbot-icon").click(function(){
    $("#chatbot-column").show();
  });
  $("#chatbot-hide").click(function(){
    $("#chatbot-column").hide();
  });
});
// END CHATBOT