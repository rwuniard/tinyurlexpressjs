const myRedis = require('redis');
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

    setTinyUrl(tinyUrlId, destAddr) {
        var that = this;
        return new Promise(function (resolve, reject) {
            that.client.set(tinyUrlId, destAddr, (error, result) => {
                if (error) {
                    console.log('Error setting tinyUrl: ' + tinyUrlId + ' with error: '+ error);
                    reject(error);
                }
                else {
                    console.log('Successfully set tinyUrl: ' + tinyUrlId);
                    resolve(result);
                }
            });
        });
    }

    getRealAddr(tinyUrlId) {
        var that = this;
        return new Promise((resolve, reject) => {
            that.client.get(tinyUrlId, (error, result) => {
                if (error) {
                    console.log('Error getting tinyUrlId: ' + tinyUrlId);
                    reject(error);
                }
                else {
                    console.log('Successfully getting tinyUrlId: ' + tinyUrlId + ' result: ' + result);
                    resolve(result);
                }
            });
        });
    }
}


module.exports = DataAccess;