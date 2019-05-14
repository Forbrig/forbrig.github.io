$('#aboutBtn').click(function() {
    $('#about').show();
    $('#portfolio').hide();
    $('#portfolio').html('');
});

$('#portfolioBtn').click(function() {
    $('#about').hide();
    $('#portfolio').show();
    // $('#openfl-content > canvas').attr('height', '100%');
    // var canvas = $('#openfl-content > canvas');
    var canvas = $('#portfolio').contents().find('#openfl-content > canvas');
    // canvas.removeProperty('width');
    canvas.width = $("#portfolio").width();
    canvas.css('width', '100%');
    // $('#portfolio').load("https://forbrig.github.io/GAMES-2019-T1/theGame/export/html5/bin/");
});