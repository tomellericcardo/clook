var ajax = {

    request: function(method, url, data, callback) {
        var req = new XMLHttpRequest();
        req.open(method, url, true);
        req.setRequestHeader('Content-Type', 'application/json');
        req.onreadystatechange = function () {
            if (req.readyState === 4 && req.status === 200)
                callback(JSON.parse(req.responseText));
        };
        req.send(JSON.stringify(data));
    }

};

function filled(value) {
    return !(value == '' || value == null);
}
