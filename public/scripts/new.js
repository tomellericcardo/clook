var newClook = {

    init_create: function() {
        document.querySelector('#create').addEventListener('click', newClook.create);
        document.querySelectorAll('.clook_field').forEach(function(element) {
            element.addEventListener('keyup', function(event) {
                if (event.keyCode == 13) newClook.create();
            });
        });
    },

    create: function() {
        var title = document.querySelector('#title').value;
        var time = document.querySelector('#duration').value;
        if (filled(title) && filled(time)) {
            var color = document.querySelector('#color').value;
            time = time.split(':');
            var hours = parseInt(time[0]);
            var minutes = parseInt(time[1]);
            var duration = ((hours * 60) + minutes) * 60 * 1000;
            ajax.request('POST', '/clook', {
                title: title,
                duration: duration,
                color: color
            }, function(res) {
                if (res.status == 'success')
                    window.location.href = '/clook/' + res.data.id;
                else document.querySelector('#error').innerHTML = res.message;
            });
        } else document.querySelector('#error').innerHTML = 'You must fill the fields';
    }

};


document.addEventListener('DOMContentLoaded', newClook.init_create());
