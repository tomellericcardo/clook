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
            var duration = newClook.duration(time);
            var request = {
                title: title,
                duration: duration,
                color: color
            };
            if (document.querySelector('#start').checked)
                request.started = Date.now();
            ajax('POST', '/clooks', request, function(res) {
                if (res.status == 'success')
                    window.location.href = '/clooks/' + res.data.id;
                else document.querySelector('#error').innerHTML = res.message;
            });
        } else document.querySelector('#error').innerHTML = 'You must fill the fields';
    },

    duration: function(time) {
        time = time.split(':');
        let hours = parseInt(time[0]);
        let minutes = parseInt(time[1]);
        return ((hours * 60) + minutes) * 60 * 1000;
    }

};


document.addEventListener('DOMContentLoaded', newClook.init_create());
