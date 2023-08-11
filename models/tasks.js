const { Task } = require("./task");
require('colors');
class Tasks {
    _listado = {};


    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => listado.push(this._listado[key]))
        return listado;
    }

    setListadoObj(data) {
        this._listado = data;
    }
    constructor() {
        this._listado = {};
    }

    addTask(desc = '') {
        const task = new Task(desc);
        this._listado[task.id] = task;
    }

    completeList() {
        this.listadoArr.forEach((task, i) => {
            const ix = i + 1;
            console.log(`${ix.toString().green}. ${task.desc} :: ${task.completeWhen === null ? 'PENDING'.red : 'COMPLETED'.green}`)
        })
    }

    taskCompletedList() {
        let counter = 1;
        this.listadoArr.forEach((task, i) => {
            if (task.completeWhen === null) return;
            console.log(`${counter.toString().green}. ${task.desc} ::  ${task.completeWhen}`)
            counter++;
        })

    }

    taskPendingList() {
        let counter = 1;
        this.listadoArr.forEach((task, i) => {
            if (task.completeWhen !== null) return;
            console.log(`${counter.toString().green}. ${task.desc} :: ${'PENDING'.red}`)
            counter++;
        })


    }
    deleteTask(id) {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }
    completeTask(ids = []) {
        Object.keys(this._listado).forEach(item => {
            if (ids.includes(item)) {
                this._listado[item].completeWhen = new Date().toISOString();
            } else {
                this._listado[item].completeWhen = null;
            }
        })
    }
}

module.exports = { Tasks }