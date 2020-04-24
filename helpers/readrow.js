let EventEmitter = require('events');
let fs = require('fs');
const dotenv = require('dotenv').config()


class ReadRow extends EventEmitter{
  constructor(file, limit = 1000, bufferSize = 1024){
    super();
    this.source = file;
    this.bufferSize = bufferSize;
    this.read = this.read.bind(this);
    this.limit = limit;
  }
  read(){
    let pos = 0;
    let _read = (fd, bytesTotal) => {
      let dblqcount = 0;
      let buf = Buffer.alloc(this.bufferSize);
      let off = 0;
      let num = 0;
      let stop = false;
      let _readline = () => {
        fs.read(fd, buf, off, 1, pos, (err, bytesNum, bufRef) =>{
          if(err) throw err;
          if(pos === bytesTotal ||stop ){
            fs.close(fd,()=>{
              this.emit('close',stop ? num : bufRef[off] === 0x0a ? num - 1 : num);
            });
            return;
          }
          if(bufRef[off] === 0x22){
            dblqcount++;
          }
          else if((bufRef[off] === 0x0a|| pos === bytesTotal) && dblqcount % 2 === 0){
            num++;
            this.emit('row',bufRef.slice(0, off).toString('utf8'));
            if(num === this.limit){
                stop = true;
                console.log('stop reading file, row number reachs limitation');
            }
            off = -1;
          }

          pos++;
          off++;
          setImmediate(_readline);
        })
      }
      _readline()
    }
    fs.stat(this.source, (err, stat) => {
      if(err) throw err;
      if(!stat.isFile()) throw new Error('this type of file is not supported');
      fs.open(this.source, 'r', (err, fd) => {
        if(err) throw err;
        setImmediate(_read.bind(this, fd, stat.size))
      })
    })
  } 
}
module.exports = ReadRow;