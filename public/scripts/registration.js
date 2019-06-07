var registration = {

    init_register: function() {
        document.querySelector('#register').addEventListener('click', registration.register);
        document.querySelectorAll('.registration_field').forEach(function(element) {
            element.addEventListener('keyup', function(event) {
                if (event.keyCode == 13) registration.register();
            });
        });
    },

    register: function() {
        var username = document.querySelector('#username').value;
        var password = document.querySelector('#password').value;
        var password2 = document.querySelector('#password2').value;
        if (filled(username) && filled(password) && filled(password2)) {
            if (password === password2)
                ajax.request('POST', '/register', {
                    username: username,
                    password: password
                }, function(res) {
                    if (res.status == 'success') window.location.href = '/clooks';
                    else message.error(res.message);
                });
            else message.error('Passwords not matching');
        } else message.error('You must fill the fields');
    }

};


document.addEventListener('DOMContentLoaded', registration.init_register());
