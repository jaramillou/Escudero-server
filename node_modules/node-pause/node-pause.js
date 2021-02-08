

function pause(msg){
    if(msg)
        console.log(msg);

    const stdin = process.stdin;
    stdin.setRawMode(true);
    
    stdin.resume();

    return new Promise((resolve, reject) =>{
        stdin.on('data', key => {
            stdin.pause();
            
            resolve(key.toString('utf8'));
        });
    });
}

module.exports = pause;