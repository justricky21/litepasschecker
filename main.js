const path = require('path');
const fs = require('fs');
const readline = require('readline');

const isPkg = typeof process.pkg !== 'undefined';
const dirPath = isPkg ? path.join(path.dirname(process.execPath), 'wordlists') : path.join(__dirname, 'wordlists');

let giantArray = [];

try {
  // I could've concatenated the lists before packaging but I was too lazy to work around the memory usage for doing so.
  // Also I built this in 15 minutes
  fs.readdirSync(dirPath).forEach(listName => {
    console.log('loading ' + listName);
    const listPath = path.join(dirPath, listName);
    const list = fs.readFileSync(listPath, 'utf8').split('\n');
    giantArray.push(list);
  });

  console.log('flattening lists...');
  giantArray = giantArray.flat();
  console.clear();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const askPass = () => rl.question('Please input the password to check: ', password => {
    const passwordIsFound = giantArray.includes(password);
    if (passwordIsFound) {
      console.log('Password was found! Use a better one buster');
    } else {
      console.log('Nice password. Go ahead and use it chummer.');
    }
    askAnotherPass()
  });

  const askAnotherPass = () => {
    rl.question('Do you want to check another password? (y/n): ', answer => {
      if (answer.toLowerCase() === 'y') {
        askPass();
      } else if (answer.toLowerCase() === 'n') {
        rl.close();
        console.log('Hope this helped! Stay safe out there!');
        console.log('Remember to hydrate, eat well, sleep well and, if you can, get out of the house at least once a day!');
        console.log('Press any key to exit...');
        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.on('data', process.exit.bind(process, 0));
      }
       else {
        console.log('Only y or no, please!');
        askAnotherPass()
      }
    });
  }

  askPass()
} catch (err) {
  console.error('An error occurred:', err);
  console.log('Remember to yell at Ricky for being a dofus.');
  console.log('Press any key to exit...');
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.on('data', process.exit.bind(process, 0));
}
