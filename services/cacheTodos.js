const Todo = require('../models/todo')


const redis = require('redis')
const DEFAULT_EXPIRATION = 660
// const redisClient = Redis.createClient()

let client;

(async () => {
    client = redis.createClient();

    client.on("error", (error) => console.error(`Redis Error : ${error}`))
    client.on('ready', () => console.log("REDIS connection works !"))


    await client.connect();
})();

class Cache {

    async getCachedTodos() {
        const todos = await client.GET('todos')
        if (todos != null){
            console.log("-> HIT Cached todos")
            return JSON.parse(todos)
        }
        else
            return null
    }

    async getCachedDoneTodos() {
        const todos = await client.GET('todos')
        if (todos != null){
            console.log("-> HIT Cached DONE todos")
            return JSON.parse(todos)
        }
        else
            return null
    }

    //Todos saved in cache
    cacheTodos() {

        Todo.findAll({
            raw: true,
            where: {
                done: false,
                active: true
            },
            order: [
                ['collect_date', 'ASC']
            ]
        })
            .then(async (todo) => {
                // await client.set('todos', JSON.stringify(todo))
                const cache = await client.SETEX('todos', DEFAULT_EXPIRATION, JSON.stringify(todo))
                if (cache) {
                    console.log("Todos cached!")
                }
            })
            .catch(error => {
                console.log("Error on cacheTodos: " + error)
            })
    }
    cacheDoneTodos() {

        Todo.findAll({
            raw: true,
            where: {
                done: true,
                active: true
            },
            order: [
                ['collect_date', 'ASC']
            ]
        })
            .then(async (todo) => {
                // await client.set('todos', JSON.stringify(todo))
                const cache = await client.SETEX('doneTodos', DEFAULT_EXPIRATION, JSON.stringify(todo))
                if (cache) {
                    console.log("DONE Todos cached!")
                }
            })
            .catch(error => {
                console.log("Error on cache DONE Todos: " + error)
            })
    }

}

module.exports = Cache