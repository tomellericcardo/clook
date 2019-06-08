var clooks = {

    init: function() {
        clooks.init_new();
    },

    init_new: function() {
        document.querySelector('#new').addEventListener('click', function() {
            window.location.href = '/new';
        });
    }

};


document.addEventListener('DOMContentLoaded', clooks.init());
