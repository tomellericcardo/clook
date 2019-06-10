var settings = {

    init: function() {
        settings.init_show_forms();
        settings.init_change_username();
        settings.init_change_password();
    },

    init_show_forms: function() {
        document.querySelector('#show_username').addEventListener('click', function() {
            if (document.querySelector('#username_form').classList.contains('w3-hide')) {
                document.querySelectorAll('.form').forEach(function (element) {
                    element.classList.add('w3-hide');
                });
                document.querySelector('#username_form').classList.remove('w3-hide');
            }
        });
        document.querySelector('#show_password').addEventListener('click', function() {
            if (document.querySelector('#password_form').classList.contains('w3-hide')) {
                document.querySelectorAll('.form').forEach(function (element) {
                    element.classList.add('w3-hide');
                });
                document.querySelector('#password_form').classList.remove('w3-hide');
            }
        });
    },

    init_change_username: function() {
        document.querySelector('#change_username').addEventListener('click', settings.change_username);
        document.querySelectorAll('.username_field').forEach(function(element) {
            element.addEventListener('keyup', function(event) {
                if (event.keyCode == 13) settings.change_username();
            });
        });
    },

    change_username: function() {
        var password = document.querySelector('#password_username').value;
        var username = document.querySelector('#username').value;
        if (filled(password) && filled(username)) {
            ajax.request('PUT', '/settings', {
                password: password,
                new_username: username.toLowerCase()
            }, function(res) {
                if (res.status == 'success') window.location.href = '/';
                else document.querySelector('#username_error').innerHTML = res.message;
            });
        } else document.querySelector('#username_error').innerHTML = 'You must fill the fields';
    },

    init_change_password: function() {
        document.querySelector('#change_password').addEventListener('click', settings.change_password);
        document.querySelectorAll('.password_field').forEach(function(element) {
            element.addEventListener('keyup', function(event) {
                if (event.keyCode == 13) settings.change_password();
            });
        });
    },

    change_password: function() {
        var password = document.querySelector('#password').value;
        var new_password = document.querySelector('#new_password').value;
        var new_password2 = document.querySelector('#new_password2').value;
        if (filled(password) && filled(new_password) && filled(new_password2)) {
            if (new_password === new_password2)
                ajax.request('PUT', '/settings', {
                    password: password,
                    new_password: new_password
                }, function(res) {
                    if (res.status == 'success') window.location.href = '/';
                    else document.querySelector('#password_error').innerHTML = res.message;
                });
            else document.querySelector('#password_error').innerHTML = 'New passwords not matching';
        } else document.querySelector('#password_error').innerHTML = 'You must fill the fields';
    }

};


document.addEventListener('DOMContentLoaded', settings.init());
