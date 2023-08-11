 const {v4: uuidV4} = require('uuid');

class Task{
    id='';
    desc='';
    completeWhen=null;

    constructor(desc){
        this.id = uuidV4();
        this.desc = desc;
        this.completeWhen = null;
    }


}

module.exports = {Task}