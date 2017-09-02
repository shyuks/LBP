$(document).ready(function() {

    $(document).mouseup(function(e) {
        var container = $("#main-menu");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            container.hide();
        }
    });

    $("button").click(function() {
        $('html,body').animate({
            scrollTop: $(".second").offset().top},
            'slow'
        );
    });

    var toggle = false;
    $('.toggle-menu').on('click', function(e) {
        e.preventDefault();
        if (toggle) {
            $('#main-menu').css('display', 'none').hide("fast");
            toggle = false;
            return;
        } else {
            $('#main-menu').css('display', 'block').show(2000);
            toggle = true;
            return;
        }
        return;
    })

})
