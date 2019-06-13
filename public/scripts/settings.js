// User settings page
var settings = {

    // Initialization
    init: function() {
        settings.init_change();
        settings.init_delete();
    },

    // Change password button initialization
    init_change: function() {
        document.querySelector('#change').addEventListener('click', settings.change);
        document.querySelectorAll('.password_field').forEach(function(element) {
            element.addEventListener('keyup', function(event) {
                if (event.keyCode == 13) settings.change();
            });
        });
    },

    // Change password
    change: function() {
        var current_password = document.querySelector('#current_password').value;
        var new_password = document.querySelector('#new_password').value;
        var new_password2 = document.querySelector('#new_password2').value;
        if (filled(current_password) && filled(new_password) && filled(new_password2)) {
            if (new_password === new_password2)
                ajax('PUT', '/users', {
                    password: current_password,
                    new_password: new_password
                }, function(res) {
                    if (res.status == 'success') window.location.href = '/clooks';
                    else document.querySelector('#error').innerHTML = res.message;
                });
            else document.querySelector('#error').innerHTML = 'New passwords not matching';
        } else document.querySelector('#error').innerHTML = 'You must fill the fields';
    },

    // Delete user button initialization
    init_delete: function() {
        document.querySelector('#delete').addEventListener('click', function() {
            document.querySelector('.w3-modal').style.display = 'block';
        });
        document.querySelector('#close_modal').addEventListener('click', function() {
            document.querySelector('.w3-modal').style.display = 'none';
        });
        document.querySelector('#confirm').addEventListener('click', function() {
            ajax('DELETE', '/users', {}, function(res) {
                window.location.href = '/users/login';
            });
        });
    }

};


// Initialize when page is ready
document.addEventListener('DOMContentLoaded', settings.init());
