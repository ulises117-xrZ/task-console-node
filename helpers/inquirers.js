
const inquirer = require('inquirer');
require('colors');


const enterOption = [
    {
        type: 'input',
        name: 'opt',
        message: `Presiona ${'ENTER'.green} para continuar`
    }
]


const menuOptions = [
    {
        type: 'list',
        name: 'options',
        message: 'que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear tarea`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar tarea(s)`
            },
            {
                value: '0',
                name: `${'0.'.green} Cerrar`
            },
        ]
    }
]

const inquirerMenu = async () => {
    console.clear();
    console.log('======================================='.green)
    console.log('Selecciona una opción de las siguientes'.white)
    console.log('=======================================\n'.green)

    const opt = await inquirer.prompt(menuOptions)
    return opt.options;
}

const readInputG = async (message = '') => {
    const question = [
        {
            type: 'input',
            name: 'opt',
            message,
            validate(value) {
                if (value.length === 0) {
                    return `${'ERROR'.red} debes ingresar una tarea`
                };

                return true;
            }
        }
    ]
    const { opt } = await inquirer.prompt(question);
    return opt;
}

const deleteTaskList = async (tasks = []) => {
    const choices = tasks.map((task, i) => {
        const idx = `${i + 1}`.green;
        return {
            value: task.id,
            name: `${idx}. ${task.desc}`
        }
    })
    const promptList = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione la tarea que desea eliminar',
            choices
        }
    ]
    const {id} = await inquirer.prompt(promptList);

    return id;
}

const confirm =async (message='')=>{
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message,
        }
    ]

    const {ok}= await inquirer.prompt(question);
    return ok;
}

const pause = async () => {
    await inquirer.prompt(enterOption);

}

const completeTaskList = async (tasks = []) => {
    const choices = tasks.map((task, i) => {
        const idx = `${i + 1}`.green;
        return {
            value: task.id,
            name: `${idx}. ${task.desc}`,
            checked: task.completeWhen !== null
        }
    })
    const promptList = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciona',
            choices
        }
    ]
    const {ids} = await inquirer.prompt(promptList);

    return ids;
}

module.exports = {
    inquirerMenu,
    pause,
    readInputG,
    deleteTaskList,
    confirm,
    completeTaskList
}