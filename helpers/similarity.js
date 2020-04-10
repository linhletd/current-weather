function findMin(...args){
    return args.reduce((acc, cur) => {
      if(typeof cur == 'number' && cur < acc){
        return cur
      }
      else {
        return acc;
      }
    },Number.POSITIVE_INFINITY)
  }
// function cost(arr,i,j){
//   let i1 = i - 1 >= 0 ? i - 1 : i;
//   let j1 = j - 1 >= 0 ? j - 1 : j;
//   let min = findMin(arr[i][j1], arr[i1][j1], arr[i1][j]);
//   return arr[i][j] === min ? 0 : 1;
// }
//   function sameEditPoint(a1,a2){
//   let a11 = a1.filter((cur, i) => (a1.indexOf(cur) !== i && a2.indexOf(cur) !== -1))
//   .filter((cur,i,arr) =>(arr.indexOf(cur) !== i))
//   .reduce((acc, cur) =>{
//       acc[cur] = 0;
//       return acc;
//   },{});
//   a1.map((cur) => a11[cur] >= 0 ? a11[cur]++ : "");
//   a2.map((cur) => a11[cur] >= 0 ? a11[cur]-- : "");
//   return a11
// }
function same(a,b,i,j,arr){
  if(a[i] !== b[j]){
    return false;
  }
  let countai = a.slice(0, i+1).filter((cur) => (cur == a[i])).length;
  let countbj = b.slice(0, j+1).filter((cur)=>(cur === b[j])).length;
  if((countai <= Math.min(i, j)+1 && countbj <= Math.min(i, j)+1)){
    if(countbj <= countai){
      return true;
    }
    else if(countbj > countai){
      console.log('i am here');
      // let x = 
      let check = optimizePath(arr, i, j-1).filter((cur) =>{
        return (cur[2] === 0 && cur[0] === i)
      }).length;
      return !check;
    }
    else {
      return false;
    }
  }
}
function optimizePath(arr,i,j){
  if(!i && !j){
    var i = arr.length - 1;
    var j = arr[0].length - 1;
  }

  let optPath = [[i,j, arr[i][j]]];

  while (j >= 0 && i >= 0){
    if(i=== 0 && j === 0){
      break;
    }
    let i1 = i - 1 >= 0 ? i - 1 : i;
    let j1 = j - 1 >= 0 ? j - 1 : j;
    let min = findMin(arr[i][j1], arr[i1][j1], arr[i1][j]);
    if(arr[i][j1] === min){
      j = j1;
      if(j === 0){
        i = i1;
      }
    }
    else if( arr[i1][j1] === min){
      i = i1;
      j = j1;
    }
    else if(arr[i1][j] === min){
      i = i1;
      if(i === 0){
        j = j1
      }
    }
    optPath.push([i,j, arr[i][j]])
  }
return optPath.reverse().map((cur,idx)=>{
  cur = [...cur];
  if(idx >0){
    cur[2]-=optPath[idx-1][2]
  }
  return cur;
});
}
function generate(a1, a2){
  if (typeof a1 != 'string' || typeof a2 != 'string' || a1.length === 0 || a2.length === 0){
    throw new Error('arguments must be the not empty strings')
  }
  let a = [...a1]; 
  let b = [...a2];

  let m = a.length;
  let n = b.length;
  let arr = [];
  for(let i = 0; i < m; i++){
    arr.push(new Array(n))
  }
  for(let i = 0; i < m; i++){
    for(let j = 0; j < n; j++){
      if(i == 0){
        if(same(a,b,i,j,arr)){
          arr[i][j] = arr[i][j-1]||0;
        }
        else{
          arr[i][j] = arr[i][j-1]+1||1;
        }
      }
      else {
        if(same(a,b,i,j,arr)){
          arr[i][j] = findMin(arr[i][j-1], arr[i-1][j-1], arr[i-1][j] );
        }
        else {
          arr[i][j] = findMin(arr[i][j-1], arr[i-1][j-1], arr[i-1][j] ) + 1;
        }
      }

    }
  }
  let optpath = optimizePath(arr);
  let aIndx = [];
  let bIndx = [];
  let path = optpath.map((cur) =>{
    if(cur[2] === 0){
      aIndx.push(cur[0]);
      bIndx.push(cur[1]);
      cur.push('match','');
    }
    return cur;
  }).map((cur, idx) =>{
    if(cur[2] !== 0){
      if(aIndx.indexOf(cur[0]) === -1){
        if(bIndx.indexOf(cur[1]) === -1){
          cur.push('substitute','substitute '+ "\'"+ b[cur[1]] +"\'" + " by " + "\'" + a[cur[0]] + "\'");
        }
        else if(bIndx.indexOf(cur[1]) !== -1){
          cur.push('insert','insert '+ "\'"+ a[cur[0]] + "\'");
        }
      }
      else if(aIndx.indexOf(cur[0]) !== -1 && bIndx.indexOf(cur[1]) === -1){
        cur.push('delete','delete ' + "\'" +b[cur[1]] + "\'");
      }
      aIndx.push(cur[0]);
      bIndx.push(cur[1])
    }

    return cur;
  })
  return {
    src: a2,
    des: a1,
    metrix: arr,
    path: path
  }
}
module.exports = generate