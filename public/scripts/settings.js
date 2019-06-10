var settings = {

    init: function() {
        settings.init_change();
        settings.init_delete();
    },

    init_change: function() {
        document.querySelector('#change').addEventListener('click', settings.change);
        document.querySelectorAll('.password_field').forEach(function(element) {
            element.addEventListener('keyup', function(event) {
                if (event.keyCode == 13) settings.change();
            });
        });
    },

    change: function() {
        var current_password = document.querySelector('#current_password').value;
        var new_password = document.querySelector('#new_password').value;
        var new_password2 = document.querySelector('#new_password2').value;
        if (filled(current_password) && filled(new_password) && filled(new_password2)) {
            if (new_password === new_password2)
                ajax.request('PUT', '/settings', {
                    password: password,
                    new_password: new_password
                }, function(res) {
                    if (res.status == 'success') window.location.href = '/';
                    else document.querySelector('#error').innerHTML = res.message;
                });
            else document.querySelector('#error').innerHTML = 'New passwords not matching';
        } else document.querySelector('#error').innerHTML = 'You must fill the fields';
    },

    init_delete: function() {
        document.querySelector('#delete').addEventListener('click', function() {
            document.querySelector('.w3-modal').style.display = 'block';
        });
        document.querySelectorAll('.close_modal').forEach(function(element) {
            element.addEventListener('click', function() {
                document.querySelector('.w3-modal').style.display = 'none';
            });
        });
        document.querySelector('#confirm').addEventListener('click', function() {
            document.querySelector('.w3-modal').style.display = 'none';
            ajax.request('DELETE', '/settings', {}, function(res) {
                if (res.status == 'success') window.location.href = '/';
                else document.querySelector('#error').innerHTML = res.message;
            });
        });
    }

};


document.addEventListener('DOMContentLoaded', settings.init());
