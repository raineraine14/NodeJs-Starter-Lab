import * as fs from 'fs';

export function blocking() {
    console.log('~before read sync');
    const data = fs.readFileSync('D:/myPersonal Files/Message.txt');
    console.log('~after read sync');
    console.log('~end');
}

function nonBlocking(): void {
    console.log('~~ before readsync');
    fs.readFile(
        'C:/Users/ascja/Documents/cwallet-db-config.txt',
        (err, data) => {
            if (err) {
                console.error(`error: error reading file ${err}`);
                return;
            } else {
                console.log('~~ data', data.toString());
            }
        }
    );
    console.log('~~ after readsync');
    console.log('~~ end');
}
