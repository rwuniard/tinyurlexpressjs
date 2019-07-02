const myRedis = require('redis');
const counter = require('../../mastercounter');


class DataAccess {
    constructor(machine_name, port) {
        this.machine_name = machine_name;
        this.port = port;
        this. client = myRedis.createClient(port, machine_name);
    }

    incrementId() {
        this.client.incr('masterCounter', (error, result) => {
            if(error) {
                console.log('Error incrementing masterCounter:' + error);
            }
            console.log('id:' + result);
            counter.mycounter = result;
        });
    }

    getNextId() {
        this.client.get('masterCounter', (error, result) => {
            if (error) {
                console.log('Error getting masterCounter:' + error);
            }
            counter = result;
        })
    }
}

// var port = 6379;
// var host = "127.0.0.1";

// var client = myRedis.createClient(port, host);

// client.on('connect', ()=> {
//     console.log('Redis client connected');
// });

// client.on('error', (err)=> {
//     console.log("Something went wrong:" + err);
// });

// client.set("masterCounter", 10000, myRedis.print);
// client.get('masterCounter', (error, result) => {
//     if (error) {
//         console.log(error);
//         throw error;
//     }
//     console.log('masterCounter:' + result);
// });

module.exports = DataAccess;