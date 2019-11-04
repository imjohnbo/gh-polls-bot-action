'use strict';

const got = require('got');

const awaitUrl = (url, option) => {
    const config = Object.assign(
        {
            tries    : 150,
            interval : 1200
        },
        option
    );

    return new Promise((resolve, reject) => {
        const attempt = async (tries) => {
            const res = await got(url, {
                followRedirect : false,
                timeout        : {
                    connect : 10000,
                    socket  : 10000,
                    request : 10000
                }
            });
            if (res.statusCode === 200) {
                resolve();
            }
            else if (tries > 1) {
                setTimeout(attempt, config.interval, tries - 1);
            }
            else {
                reject(new RangeError(`Expected 200 response but got ${res.statusCode}`));
            }
        };
        attempt(config.tries).catch(reject);
    });
};

module.exports = awaitUrl;
