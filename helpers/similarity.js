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
  function same(a,b,i,j){
    return ((a.slice(0, i+1).filter((cur) => (cur == a[i])).length <= Math.min(i, j)+1 &&
     b.slice(0, j+1).filter((cur)=>(cur === b[j])).length <= Math.min(i, j)+1) && (a[i] === b[j]))
  }
  function optimizePath(arr){
    let i = arr.length - 1;
    let j = arr[0].length - 1;
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
      }
      else if( arr[i1][j1] === min){
        i = i1;
        j = j1;
      }
      else if(arr[i1][j] === min){
        i = i1;
      }
      optPath.push([i,j, arr[i][j]])
    }
  return optPath;
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
        if(same(a,b,i,j)){
          arr[i][j] = arr[i][j-1]||0;
        }
        else{
          arr[i][j] = arr[i][j-1]+1||1;
        }
      }
      else {
        if(same(a,b,i,j)){
          arr[i][j] = findMin(arr[i][j-1], arr[i-1][j-1], arr[i-1][j] );
        }
        else {
          arr[i][j] = findMin(arr[i][j-1], arr[i-1][j-1], arr[i-1][j] ) + 1;
        }
      }
  
    }
  }
  let optpath = optimizePath(arr).reverse();
  let aIndx = [];
  let bIndx = [];
  let path = optpath.map((cur,idx)=>{
    cur = [...cur];
    if(idx >0){
      cur[2]-=optpath[idx-1][2]
    }
    return cur;
  }).map((cur) =>{
    if(cur[2] === 0){
      aIndx.push(cur[0]);
      bIndx.push(cur[1]);
      cur.push('match');
    }
    return cur;
  }).map((cur, idx) =>{
    if(cur[2] !== 0){
      if(aIndx.indexOf(cur[0]) === -1){
        if(bIndx.indexOf(cur[1]) === -1){
          cur.push('substitute '+ b[cur[1]] + " by " + a[cur[0]]);
        }
        else if(bIndx.indexOf(cur[1]) !== -1){
          cur.push('insert '+ a[cur[0]]);
        }
      }
      else if(aIndx.indexOf(cur[0]) !== -1 && bIndx.indexOf(cur[1]) === -1){
        cur.push('delete ' + b[cur[1]]);
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