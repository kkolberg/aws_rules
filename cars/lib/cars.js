'use strict';

module.exports = function (repo) {
    var handle = function (event, context, callback) {
        const done = function (err, res) {
            callback(null, {
                statusCode: err ? '400' : '200',
                body: err ? JSON.stringify({ error: err.message }) : JSON.stringify(res),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        };
        
        switch (event.httpMethod) {
            case 'GET':
                repo.index(done);
                break;
            case 'PUT':
                repo.update(event.pathParameters.id, JSON.parse(event.body).name, done);
                break;
            case 'POST':
                repo.create(JSON.parse(event.body).name, done);
                break;
            default:
                done(new Error('Unsupported method "${event.httpMethod}"'));
        }
    };

    return {
        'handle': handle
    };
};
