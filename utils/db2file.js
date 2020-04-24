const fs = require('fs');

function writeFile(conn, filename, table){
    let file = fs.createWriteStream(`./gotdata/${filename}`);
    let keys;
    let _r = 0;
    let r, w = 0;
    let x = conn.query(`SELECT * FROM ${table}`);
    x.on('error', (err) => {throw err})
    x.on('result', (row) => {
        _r++;
        // console.log(row);
        if(!keys){
            keys = Object.keys(row);
            file.write(keys.map(cur =>(`"${cur}"`)).join(',')+"\r\n");
        }
        for(let key of keys){
            let chunk;
            if(/\,/.test(row[key])|| /\n/.test(row[key])){
                chunk = `"${row[key]}"`;
            }
            else if(row[key] === null ){
                chunk = `""`;
            }
            else {
                chunk = row[key];
            }
            if(keys.indexOf(key) === keys.length - 1){
                file.write(chunk +"\r\n", (err) =>{
                    if(err) throw err;
                    w++;
                    if(r === w){
                        console.log(`${filename} completed`);
                        file.end();
                    }
                });
            }
            else{
                file.write(chunk + ",");
            }
        }
    })
    x.on('end', () => {
        r = _r;
    })

}
module.exports = writeFile