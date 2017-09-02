$(document).ready(function() {

    $('#Nav-Submit').on('click', function(e) {
        e.preventDefault();
        var $email = $('#Nav-Email').val();
        var payload = $email;

        $.ajax({
            url: "http://www.LowerBackPainpedia.com/sendSubscription",
            type: "POST",
            dataType: "json",
            data: { payload },
            success: function(data) {
                $('#Email-Modal').modal('toggle');
                return data;
            },
            error: function(err) {
                console.log('errror: ', err);
                $('#Email-Modal').modal('toggle');
                return err;
            }
        })
        $("#nav-email-form")[0].reset();
    });

    $('#Footer-Submit').on('click', function(e) {
        e.preventDefault();
        var $email = $('#Footer-Email').val();
        var payload = $email;

        $.ajax({
            url: "http://www.LowerBackPainpedia.com/sendSubscription",
            type: "POST",
            dataType: "json",
            data: { payload },
            success: function(data) {
                $('#Email-Modal').modal('toggle');
                return data;
            },
            error: function(err) {
                console.log('errror: ', err);
                $('#Email-Modal').modal('toggle');
                return err;
            }
        })
        $("#footer-email-form")[0].reset();
    })
})
