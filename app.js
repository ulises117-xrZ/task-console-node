const { inquirerMenu, pause, askTask, readInputG, deleteTaskList, confirm, completeTaskList } = require('./helpers/inquirers');
const { saveTasks, readDB } = require('./helpers/saveFile');
const { Tasks } = require('./models/tasks');


require('colors');

const main = async () => {
    let option = '';
    const tareas = new Tasks();
    const tareasDB = readDB();

    if (tareasDB) {
        tareas.setListadoObj(tareasDB);
        //TODO: implementar logica
    }

    do {
        option = await inquirerMenu();
        switch (option) {
            case '1':
                const task = await readInputG(`Ingrese la ${'TAREA'.cyan}`);
                tareas.addTask(task);
                break;
            case '2':
                tareas.completeList();
                break;
            case '3':
                tareas.taskCompletedList();
                break;
            case '4':
                tareas.taskPendingList();
                break;
            case '5':
                const list = await completeTaskList(tareas.listadoArr);
                tareas.completeTask(list);
                console.log(list);
                break;
            case '6':
                const id = await deleteTaskList(tareas.listadoArr);
                const deleteT = await confirm('Estas seguro'.yellow);
                console.log(id);
                if(deleteT){
                    tareas.deleteTask(id);
                }
                console.log(deleteT);
                break;
            default:
                break;
        }
        saveTasks(tareas._listado)
        await pause();
        // if (option !== '0') await pausa();

    } while (option !== '0');
}

main();