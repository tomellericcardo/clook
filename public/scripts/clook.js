var clook = {

    init: function() {
        clook.init_clook();
        clook.init_delete();
    },

    init_clook: function() {
        clookInfo.started = Date.now();
        var elapsed, sector, gradient_property;
        var interval = setInterval(function() {
            elapsed = Date.now() - clookInfo.started;
            sector = (elapsed * 100) / clookInfo.duration;
            if (sector >= 100) {
                gradient_property = 'conic-gradient(#2c313c 100%, ';
                gradient_property += clookInfo.color ? clookInfo.color : '#b03634';
                gradient_property += ' 0)';
                clearInterval(interval);
            } else {
                gradient_property = 'conic-gradient(';
                gradient_property += '#2c313c ' + sector + '%, ';
                gradient_property += clookInfo.color ? clookInfo.color : '#b03634';
                gradient_property += ' ' + (sector + .2) + '%)';
            }
            document.querySelector('#timer').style.background = gradient_property;
        }, 1000);
    },

    init_delete: function() {
        document.querySelector('#delete').addEventListener('click', function() {
            ajax.request('DELETE', '/clook', {
                clookId: clookInfo.id
            }, function(res) {
                if (res.status == 'success')
                    window.location.href = '/clooks';
                else message.error(res.message);
            });
        });
    }

};


document.addEventListener('DOMContentLoaded', clook.init());
