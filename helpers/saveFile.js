const fs = require('fs');

const fileRoute = './db/data.json';

const saveTasks = (data) => {
    fs.writeFileSync(fileRoute, JSON.stringify(data));
}

const readDB = () => {
    if(!fs.existsSync(fileRoute))return null;
    const info = fs.readFileSync(fileRoute, {encoding: 'utf-8'});
    const parsedDT = JSON.parse(info);
    return parsedDT;
}

module.exports = { saveTasks, readDB };