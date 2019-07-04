const myRedis = require('redis');
// const counter = require('../../mastercounter');
const Promise = require('promise');

class DataAccess {
    constructor(machine_name, port) {
        this.machine_name = machine_name;
        this.port = port;
        this. client = myRedis.createClient(port, machine_name);
    }

    incrementId() {
        var that = this; // I need to assign it to that, otherwise the this will not be defined inside the Promise.
        return new Promise(function(resolve, reject) {
            that.client.incr('masterCounter', (error, result) => {
                if(error) {
                    console.log('Error incrementing masterCounter:' + error);
                    reject(error);
                }
                else {
                    console.log('incrementId:' + result);
                    resolve(result);
                }
                
                
            });
        });
       
    }

    getNextId() {
        var that = this; // I need to assign it to that, otherwise the this will not be defined inside the Promise.
        return new Promise(function(resolve, reject) {

            that.client.get('masterCounter', (error, result) => {
                if (error) {
                    console.log('Error getting masterCounter:' + error);
                    reject(error);
                }
                else {
                    console.log('getNextId result: ' + result);
                    resolve(result);
                }
            });
        });
        
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