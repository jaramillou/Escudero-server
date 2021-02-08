# Node Pause

Simple module to wait for a key be pressed to continue, like the "pause" command in windows command prompt.

# Installation

```
npm install --save node-pause
```

or

```
yarn add node-pause
```

# Usage

```
const pause = require('node-pause');
```

The pause function recieves an optional parameter with the message that will be displayed, this function returns a promisse that will be called when any key is pressed returning the key character.

```javascript
const pause = require('node-pause');

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

```

