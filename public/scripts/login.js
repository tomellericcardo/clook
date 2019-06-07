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
                username: username,
                password: password
            }, function(res) {
                if (res.status == 'success') window.location.href = '/clooks';
                else message.error(res.message);
            });
        else message.error('You must fill the fields');
    }

};


document.addEventListener('DOMContentLoaded', login.init_authenticate());
