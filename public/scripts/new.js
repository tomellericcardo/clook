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
        var duration = document.querySelector('#duration').value;
        var color = document.querySelector('#color').value;
        if (filled(title) && filled(duration))
            ajax.request('POST', '/clook', {
                title: title,
                duration: duration,
                color: color
            }, function(res) {
                if (res.status == 'success')
                    window.location.href = '/clook/' + res.data.id;
                else message.error(res.message);
            });
        else message.error('You must fill the fields');
    }

};


document.addEventListener('DOMContentLoaded', newClook.init_create());
