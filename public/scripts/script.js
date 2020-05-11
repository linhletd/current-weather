import React from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import {Route, Switch, Redirect, BrowserRouter, useRouteMatch, useParams, NavLink} from 'react-router-dom'


function fetchData(option){
  return fetch('/apis/weather',{
    method: 'POST',
    headers:{'Content-Type': 'application/json'},//'application/x-www-form-urlencoded' 'application/json'
    cache: 'no-cache',
    body: JSON.stringify(option) // 'lat=21.5252992&lon=105.8865151999' for urlencoded
  })
  .then(data => data.json())
  //   .catch((err) => {
  //     document.getElementById('message').innerText = err.message
  //   });
}
async function getDataByLatLon(){
  var position = await new Promise((resolve, reject) => {navigator.geolocation.getCurrentPosition(resolve, reject)})
    .then(null,err => { return Promise.reject({message:'you have denied this page to access your location, please go to chrome://settings/content/location to anable'})})
    if(position){
      var pos = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
      }; 
      console.log(pos);
      let response = await fetchData(pos);
      console.log(response)
      return response;
    }
 }
function builder(data){
  let src = data.src;
  let des = data.des;
  let result = data.path.filter((cur) =>(cur[3] !== 'match')).map((cur) =>{
    let type = cur[3];
    let change, style, head;
    if(type === 'delete'){
      head = des.slice(0, cur[0] + 1)
      change = src[cur[1]]
      style = {"backgroundColor": "red"};
    }
    else if(type === 'substitute'){
      head = des.slice(0, cur[0])
      change = des[cur[0]]
      style = {"backgroundColor": "yellow"};
    }
    else if(type === 'insert'){
      head = des.slice(0, cur[0])
      change = des[cur[0]];
      style = {"backgroundColor": "green"};
    }
    return {
      head,
      tail: src.slice(cur[1] + 1),
      comment: cur[4],
      change,
      style
    }
  });
  return result;
}
const UPDATE = 'UPDATE';
const ERROR = 'ERROR';
const TRANSFORM = 'TRANSFORM'
function updateActionCreator(res){
  return {
    type: UPDATE,
    dt:{
      location: res.city ? res.city.split(/\s\//)[0] + ", " + res.name + ", " + res.sys.country : res.name + ", " + res.sys.country,
      weather: {
        main: res.weather[0].main + ", " + res.weather[0].description,
        temp: res.main.temp,
        visibility: res.visibility,
        sunrise: new Date(res.sys.sunrise * 1000).toTimeString().slice(0,8),
        sunset: new Date(res.sys.sunset * 1000).toTimeString().slice(0,8),
        icon: res.weather[0].icon
      }
    }
  }
}
function errorActionCreator(message){
  return {
    type: ERROR,
    message
  }
}
function transformActionCreator(data){
  return {
    type: TRANSFORM,
    data
  }
}
function countNeighbor(arr,i,j){
  let arrLen = arr.length;
  let list = [[i-1, j-1], [i-1,j], [i-1, j+1], [i+1, j+1], [i+1, j], [i+1, j-1],[i, j-1], [i, j+1]];
  let neighbor = list.reduce((acc, cur) => {
    if(cur[0] >= 0 && cur[0] < arrLen){
      if(arr[cur[0]][cur[1]]){
        acc += 1;
      }
    }
    return acc;
  },0);
  return neighbor === 2 && arr[i][j] === 1 || neighbor === 3 ? 1 : 0;
}
class App1 extends React.Component{
  constructor(props){
    // var state = [];
    // let m = 50;
    // let n = 50;
    // for(let i = 0; i < m; i++){
    //   state[i] = new Array(m)
    //   for(let j = 0; j < n; j++){
    //     state[i][j] = Math.round(Math.random()*0.6)
    //   }
    // }
    super(props);
    this.state = {
      matrix: [],
      timer: undefined
    };
    this.initializeState = this.initializeState.bind(this);
    this.runGame = this.runGame.bind(this);
    this.pauseGame = this.pauseGame.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }
  initializeState(){
    var matrix = [];
    let m = 50;
    let n = 50;
    for(let i = 0; i < m; i++){
      matrix[i] = new Array(m)
      for(let j = 0; j < n; j++){
        matrix[i][j] = Math.round(Math.random()*0.6)
      }
    }
    this.setState({
      matrix: matrix,
    })
    return matrix
  }
  resetGame(){
    clearTimeout(this.state.timer);
    this.initializeState()
  }
  runGame(){
    let m = this.state.matrix.length;
    let n = this.state.matrix[0].length;
    var timerId = setTimeout(function run(){
      var matrix = [...this.state.matrix].map((cur) => ([...cur]))
      for(let i = 0; i < m; i++){
        for(let j = 0; j < n; j++){
          matrix[i][j] = countNeighbor(this.state.matrix,i,j)
        }
      }
      // console.log(this.state.matrix, matrix)
      timerId = setTimeout(run.bind(this), 1000);
      this.setState({
        matrix: matrix,
        timer: timerId
      });
    }.bind(this),1000);
    this.setState({
      timer: timerId
    })
  }
  pauseGame(){
    clearTimeout(this.state.timer);
    this.setState({timer: undefined})
  }
  componentDidMount(){
    this.initializeState()
  }
  render(){
    let matrix = this.state.matrix;
    // console.log(matrix)
    let rows = matrix.map((cur,i) => (<tr key = {`t1${i}`}>{cur.map((val,j) => <td style = {{"backgroundColor": (val === 1 ? "black" : "white")}} key = {`t1${i}${j}`}></td>)}</tr>))
    return (
      <div>
        <button onClick = {this.runGame}>play</button>
        <button onClick = {this.pauseGame}>pause</button>
        <button onClick = {this.resetGame}>reset</button>
        <table id = "lifegame">
          <tbody>
           {rows}
          </tbody>
        </table>
      </div>
    )
  }
};
const DisplayError = (props) => {
  let style = props.error ? {display: "block"} : {display: "none"};
  return (
  <div id = "err-message" style = {style} >{props.error}</div>
  )
}
const SearchBar = (props) => {
  var style = !props.getGeo ? {display: "block"} : {display: "none"}
  return (
      <div id = "search-bar">
        <input style = {style} id = 'find' name = 'q' value = {props.input} placeholder = 'e.g: thai nguyen' onChange = {props.change}></input>
        <button id = 'findIcon' onClick = {props.clicks.find} ><i className="fa fa-search"></i></button>
        <button id = 'mylocation' onClick = {props.clicks.geo} ><i className="fa fa-map-marker"></i></button>
      </div>
    )
  }
const WeatherShow = (props) => {
  let style = props.display === true ? {display:"block"} : {display: "none"}
  // let imgUrl = props.data ? "http://openweathermap.org/img/wn/"+props.data.weather.icon+"@2x.png" : ""
  // let location = props.data ? props.data.location : ""
  if(props.data){
    return (
      <div id = "weather-show" style = {style} >
      <h2>{props.data.location}</h2>
      <img src = {"http://openweathermap.org/img/wn/"+props.data.weather.icon+"@2x.png"}></img>
      <span style = {{fontSize: '20px'}}>{props.data.weather.temp} &#8451;</span>
      <div>{props.data.weather.main}</div>
      <div>Visibility: {props.data.weather.visibility|| "---"} m</div>
      <div>Sunrise: {props.data.weather.sunrise}</div>
      <div>Sunset: {props.data.weather.sunset}</div>
     </div>
    )
  }
  else{
    return (<div></div>)
  }

}
const SimilarApp = (props) => {
  console.log(props.data)
  if(props.data.des){
    let optmz = props.data.path.map(cur =>{
      cur = cur.slice(0,2).join(",");
      return cur;
    })
    let td = ((data)=>{
      let _td = data.map((cur, idx) =>{
        cur = [...cur];
        cur.unshift(props.data.des[idx] == " " ? `'${props.data.des[idx]}' -${idx + 1}` : `${props.data.des[idx]}-${idx + 1}`);
        return cur;
      })
      let headrow = props.data.src.split("").map((cur,idx) => (cur == " " ? `'${cur}'-${idx + 1}` : `${cur}-${idx + 1}`));
      headrow.unshift("$");
      _td.unshift(headrow);
      return _td
    })(props.data.matrix)

    let illustrate = builder(props.data);
    console.log(illustrate)

    return (
      <div>
        <form id = "form2">
          <label htmlFor = "src">From</label>
          <input name = "src" type = "text" required = "required"></input>
          <label htmlFor = "des">To</label>
          <input name = "des" type = "text" required = "required" ></input>
          <button onClick = {props.click}>Submit</button>
        </form>
        <table>
          <tbody>
            {
              td.map((cur,i) =>(<tr key = {`t2${i}`}>{cur.map((val,j) => {
              if(optmz.indexOf([i-1,j-1].join(",")) !== -1){
                return (<td style = {{"backgroundColor": "green"}} key = {`t2${i}${j}`}>{val}</td>)
              }
              else {
                return (<td key = {`t2${i}${j}`} style = {i == 0 || j == 0 ? {"fontWeight": "bold"} : {"fontWeight": "unset"}}>{val}</td>)
              }
              })}</tr>))
            }
          </tbody>
        </table>
        <ol>
          <span style = {{"listStyleType": "none"}}>{props.data.src}<span>&larr;start</span></span>
          {
            illustrate.map((cur,i) => (<li key = {`l1${i}`}>{cur.head}<span style = {cur.style}>{cur.change}</span>{cur.tail}<span>&larr;{cur.comment}</span></li>))
          }
          <li style = {{"listStyleType": "none"}}>{props.data.des}<span>&larr;complete</span></li>
        </ol>
      </div>
    )
  }
  else return (
    <form id = "form2">
      <label htmlFor = "src">From</label>
      <input name = "src" type = "text" required = "required"></input>
      <label htmlFor = "des">To</label>
      <input name = "des" type = "text" required = "required" ></input>
      <button onClick = {props.click}>Submit</button>
    </form>
  )
}
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      getGeo: true,
      data: false,
      input: '',
      similar: {}
    }
    this.handleClickFind = this.handleClickFind.bind(this);
    this.handleClickGetGeo = this.handleClickGetGeo.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleSubmitSimilar = this.handleSubmitSimilar.bind(this);
  }

  handleChangeInput(e){
    this.setState({input: e.target.value});
  }
  handleClickFind(){
    if(this.state.getGeo === true){
      this.setState({getGeo: false})
    }
    else if(this.state.input){
      fetchData({q: this.state.input})
      .then((data) => {
        console.log(data)
        if(data.weather){
          this.props.updateWeatherData(updateActionCreator(data))
          this.setState({data: true, input: ''})
        }
        else if (data.message){
          return Promise.reject(data)
        }
      })
      .catch((err) => {
        this.props.updateWeatherData(errorActionCreator(err.message))
        this.setState({input: ''})
      })
    }
  }
  handleClickGetGeo(e){
    e.preventDefault();
    this.setState({getGeo: true})
    getDataByLatLon().then((data) => {
      if(data.weather){
        this.props.updateWeatherData(updateActionCreator(data))
        this.setState({data: true})
      }
    })
    .catch((err) => {
      this.props.updateWeatherData(errorActionCreator(err.message))
      this.setState({input: ''})
    })
  }
  handleSubmitSimilar(e){
    e.preventDefault()
    let form = new FormData(document.getElementById('form2'));
      let body = {};
      for (let elem of form.entries()){
        body[elem[0]] = elem[1];
      }
    fetch('/apis/similar',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      cache: 'no-cache',
      body: JSON.stringify(body)
    }).then((response) => (response.json()))
    .then((data) => {
      this.setState({similar: data});
    })
    .catch((err) => {
      this.props.updateWeatherData(errorActionCreator(err.message))
    })
  }
  componentDidMount(){
    // document.addEventListener('keydown',)
  }
  render() {
    return (
      <div>
        <DisplayError error = {this.props.error}/>
        <div>
          <h2>COOL WEATHER APP</h2>
          <SearchBar getGeo = {this.state.getGeo} input = {this.state.input} change = {this.handleChangeInput} clicks = {{find: this.handleClickFind, geo: this.handleClickGetGeo}}/>
          <WeatherShow display = {this.state.data} data = {this.props.weather}/>
        </div>
        <SimilarApp data = {this.state.similar} click = {this.handleSubmitSimilar}/>
        <App1/>
      </div>

    );
  }
}
function reducer(state = {}, action){
  switch(action.type){
    case UPDATE:
      return {weather: action.dt};
    case ERROR:
      return {error: action.message};
    default:
      return state;
  }
}
const store = createStore(reducer);
store.subscribe(() => {console.log('update')});
const mapStateToProps = function(state){
  return {
    weather: state.weather,
    error: state.error
  }
}
const mapDispatchToProps = function(dispatch){
  return {
    updateWeatherData: function(action){
      dispatch(action);
    },
  }
}
const Provider = connect(mapStateToProps, mapDispatchToProps)(App);
render(<Provider store = {store}/>, document.getElementById('root'));

//  async function getByInput(e){
//     e.preventDefault();
//     if(document.getElementById('find').style.display == 'none'){
//       document.getElementById('find').style.display = 'block';
//     }
//     else{
//       let form = new FormData(document.getElementById('myform'));
//       let loc = {};
//       for (elem of form.entries()){
//         loc[elem[0]] = elem[1];
//       }
//       console.log(loc);
//       let response = await fetchData(loc);
//       console.log(response)
//       document.getElementById('message').innerText = JSON.stringify(response.city);
//     }
//  }

//  document.getElementById('mylocation').addEventListener('click', getByLonLat);
//  document.getElementById('findIcon').addEventListener('click', getByInput)
//  getLonLat();
//