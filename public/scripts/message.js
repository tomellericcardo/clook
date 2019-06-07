var message = {

    success: function(content) {
        var message = document.querySelector('#message');
        message.innerHTML = content;
        message.style.color = 'green';
    },

    error: function(content) {
        var message = document.querySelector('#message');
        message.innerHTML = content;
        message.style.color = 'red';
    }

};
