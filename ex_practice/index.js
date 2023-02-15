const {writeToFile,readFromFile,cowSay,deleteFile} = require('./main');

const keyword = process.argv[2];
const arg = process.argv[3];

if(keyword === 'write'){
    writeToFile(arg);
}else if(keyword === 'read'){
    readFromFile(arg)
}else if(keyword === 'cow'){
    cowSay(arg)
}else if(keyword == 'delete'){
    deleteFile(arg)
}