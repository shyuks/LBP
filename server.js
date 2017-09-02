var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var db = require('./db/connection.js');
var sendmail = require('sendmail')();

var app = express();

// app.use(express.favicon(__dirname + './public/img/favicon.ico'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/sendSubscription', function(req, res) {
    if (typeof(req.body.payload) === 'string') {
        sendmail({
            from: 'team@doctorpedia.com',
            to: req.body.payload,
            bcc: 'todd@doctorpedia.com',
            subject: 'Welcome To Doctorpedia News Letters!',
            html: '<b>Thank you for subscribing to Doctorpedia News!</b>'
        }, function(err, reply) {
            console.log(err && err.stack);
            console.dir(reply);
        });
        res.send('sent email');
        return;
    } else {
        res.send('error in sending email');
    }
});

app.post('/sendContactForm', function(req, res) {
    var firstName = req.body.payload.firstName;
    var lastName = req.body.payload.lastName;
    var email = req.body.payload.email;
    var message = req.body.payload.message;
    if ( /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email) ) {
        sendmail({
            from: email,
            to: 'todd@doctorpedia.com',
            subject: firstName + ' ' + lastName + ' - Inquiry',
            html: '<b>' + message + '</b>'
        }, function(err, reply) {
            console.log(err && err.stack);
            console.dir(reply);
        });
    } else {
        console.log('invalid email');
    }
    res.send('sent')
});

// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname, './public/404/routing.html'));
// });

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './public/Index_A.html'));
});

app.get('/A', function(req, res) {
    res.sendFile(path.join(__dirname, './public/Index_A.html'));
});

app.get('/B', function(req, res) {
    res.sendFile(path.join(__dirname, './public/Index_B.html'));
});

app.get('/C', function(req, res) {
    res.sendFile(path.join(__dirname, './public/Index_C.html'));
});

app.get('/D', function(req, res) {
    res.sendFile(path.join(__dirname, './public/Index_D.html'));
});

app.get('/E', function(req, res) {
    res.sendFile(path.join(__dirname, './public/Index_E.html'));
});

app.get('/search', function(req, res) {
    res.sendFile(path.join(__dirname, './public/templates/search.html'));
});

app.get('/article', function(req, res) {
    res.sendFile(path.join(__dirname, './public/templates/article.html'));
});

app.get('/article-video', function(req, res) {
    res.sendFile(path.join(__dirname, './public/templates/article_video.html'));
});

app.get('/contact-us', function(req, res) {
    res.sendFile(path.join(__dirname, './public/templates/contact_us.html'));
});

app.get('/play-video', function(req, res) {
    res.sendFile(path.join(__dirname, './public/templates/video_singular.html'))
});

app.get('/treatments-therapies', function(req, res) {
    res.sendFile(path.join(__dirname, './public/templates/articles/treatment_therapies.html'))
})

app.get('/nutrition-fitness', function(req, res) {
    res.sendFile(path.join(__dirname, './public/templates/articles/nutrition_fitness.html'))
})

app.get('/non-profit', function(req, res) {
    res.sendFile(path.join(__dirname, './public/templates/articles/non_profit.html'))
})

app.get('/news-information', function(req, res) {
    res.sendFile(path.join(__dirname, './public/templates/articles/news_information.html'))
})

app.get('/new-treatments-therapies', function(req, res) {
    res.sendFile(path.join(__dirname, './public/templates/articles/new_treatment.html'))
})

app.get('/health-tip-1', function(req, res) {
    res.sendFile(path.join(__dirname, './public/templates/articles/health_tip_1.html'))
})

app.get('/health-tip-2', function(req, res) {
    res.sendFile(path.join(__dirname, './public/templates/articles/health_tip_2.html'))
})

app.get('/community-support', function(req, res) {
    res.sendFile(path.join(__dirname, './public/templates/articles/community_support.html'))
})

app.get('/digital-apps', function(req, res) {
    res.sendFile(path.join(__dirname, './public/templates/articles/digital_apps.html'))
})

app.get('/blog-1', function(req, res) {
    res.sendFile(path.join(__dirname, './public/templates/articles/blog-1.html'))
})

app.get('/blog-2', function(req, res) {
    res.sendFile(path.join(__dirname, './public/templates/articles/blog-2.html'))
})

app.get('/blog-3', function(req, res) {
    res.sendFile(path.join(__dirname, './public/templates/articles/blog-3.html'))
})

app.get('/blog-4', function(req, res) {
    res.sendFile(path.join(__dirname, './public/templates/articles/blog-4.html'))
})

app.get('/blog-5', function(req, res) {
    res.sendFile(path.join(__dirname, './public/templates/articles/blog-5.html'))
})

app.get('/privacy-policy', function(req, res) {
    res.sendFile(path.join(__dirname, './public/templates/privacy_policy.html'))
})

app.get('/terms-of-use', function(req, res) {
    res.sendFile(path.join(__dirname, './public/templates/terms_of_use.html'))
})

app.listen(3000, function() {
    console.log('Listening On http://138.68.248.193:8080/');
});

// app.listen(8080, '138.68.248.193', function() {
//     console.log('Listening On http://138.68.248.193:8080/');
// });

// app.listen(8080, '138.68.248.193', function() {
//     console.log('Listening On http://138.68.248.193:8080/');
// });
