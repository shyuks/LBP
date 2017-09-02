$(document).ready(function() {

    $('#Contact-Submit').on('click', function(e) {
        e.preventDefault();
        var firstName = $('#First-Name').val();
        var lastName = $('#Last-Name').val();
        var email = $('#Email-From').val();
        var message = $('#Message-Box').val();
        var payload = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            message: message
        }
        $.ajax({
            url: "http://www.LowerBackPainpedia.com/sendContactForm",
            type: "POST",
            dataType: "json",
            data: { payload },
            success: function(data) {
                $('#Contact-Modal').modal('toggle');
                return data;
            },
            error: function(err) {
                console.log('errror: ', err);
                $('#Contact-Modal').modal('toggle');
                return err;
            }
        })
        $("#contact-us-form")[0].reset();
    })
})
