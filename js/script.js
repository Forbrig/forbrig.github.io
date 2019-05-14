$('#aboutBtn').click(function() {
    $('#about').show();
    $('#portfolio').hide();
    $('#portfolio').html('');
});

$('#portfolioBtn').click(function() {
    $('#about').hide();
    $('#portfolio').show();
    $('#portfolio').load("forbrig.github.io/GAMES-2019-T1/theGame/export/html5/bin/");
});