var login = {

    init_authenticate: function() {
        document.querySelector('#authenticate').addEventListener('click', login.authenticate);
        document.querySelectorAll('.login_field').forEach(function(element) {
            element.addEventListener('keyup', function(event) {
                if (event.keyCode == 13) login.authenticate();
            });
        });
    },

    authenticate: function() {
        var username = document.querySelector('#username').value;
        var password = document.querySelector('#password').value;
        if (filled(username) && filled(password))
            ajax.request('POST', '/authenticate', {
                username: username.toLowerCase(),
                password: password
            }, function(res) {
                if (res.status == 'success') window.location.href = '/';
                else document.querySelector('#error').innerHTML = res.message;
            });
        else document.querySelector('#error').innerHTML = 'You must fill the fields';
    }

};


document.addEventListener('DOMContentLoaded', login.init_authenticate());
