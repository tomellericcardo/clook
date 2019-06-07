var message = {

    success: function(content) {
        var message = document.querySelector('#message');
        message.innerHTML = content;
        message.style.color = 'var(--success-color)';
    },

    error: function(content) {
        var message = document.querySelector('#message');
        message.innerHTML = content;
        message.style.color = 'var(--error-color)';
    }

};
