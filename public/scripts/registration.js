// Registration page
var registration = {

    // Register button initializaion
    init_register: function() {
        document.querySelector('#register').addEventListener('click', registration.register);
        document.querySelectorAll('.registration_field').forEach(function(element) {
            element.addEventListener('keyup', function(event) {
                if (event.keyCode == 13) registration.register();
            });
        });
    },

    // Register user
    register: function() {
        var username = document.querySelector('#username').value;
        var password = document.querySelector('#password').value;
        var password2 = document.querySelector('#password2').value;
        if (filled(username) && filled(password) && filled(password2)) {
            if (password === password2)
                ajax('POST', '/users/register', {
                    username: username.toLowerCase(),
                    password: password
                }, function(res) {
                    if (res.status == 'success') window.location.href = '/clooks';
                    else document.querySelector('#error').innerHTML = res.message;
                });
            else document.querySelector('#error').innerHTML = 'Passwords not matching';
        } else document.querySelector('#error').innerHTML = 'You must fill the fields';
    }

};


// Initialize when page is ready
document.addEventListener('DOMContentLoaded', registration.init_register());
