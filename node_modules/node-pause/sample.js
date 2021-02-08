const pause = require('./node-pause');

console.log('My special message :D');

pause('Press any key to continue.... :X')
    .then(() => {
        console.log('\n\nAnother special message');
        return pause('Press any key to exit');
    })
    .then(key => {
        console.log(`\n\nYou pressed "${key}" and the process will exit`);
        
        process.exit();
    });
