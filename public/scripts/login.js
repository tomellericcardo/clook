// Login page
var login = {

    // Authenticate button initialization
    init_authenticate: function() {
        document.querySelector('#authenticate').addEventListener('click', login.authenticate);
        document.querySelectorAll('.login_field').forEach(function(element) {
            element.addEventListener('keyup', function(event) {
                if (event.keyCode == 13) login.authenticate();
            });
        });
    },

    // Authenticate user
    authenticate: function() {
        var username = document.querySelector('#username').value;
        var password = document.querySelector('#password').value;
        if (filled(username) && filled(password))
            ajax('POST', '/users/authenticate', {
                username: username.toLowerCase(),
                password: password
            }, function(res) {
                if (res.status == 'success') window.location.href = '/clooks';
                else document.querySelector('#error').innerHTML = res.message;
            });
        else document.querySelector('#error').innerHTML = 'You must fill the fields';
    }

};


// Initialize when page is ready
document.addEventListener('DOMContentLoaded', login.init_authenticate());
