function fetchData(option){
  return fetch('/apis',{
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
      style = {"background-color": "red"};
    }
    else if(type === 'substitute'){
      head = des.slice(0, cur[0])
      change = des[cur[0]]
      style = {"background-color": "yellow"};
    }
    else if(type === 'insert'){
      head = des.slice(0, cur[0])
      change = des[cur[0]];
      style = {"background-color": "green"};
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
        <input style = {style} id = 'find' name = 'q' value = {props.input} placeHolder = 'e.g: thai nguyen' onChange = {props.change}></input>
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
    let td = props.data.metrix.map((cur, idx) =>{
      cur = [...cur];
      cur.unshift(props.data.des[idx]);
      return cur;
    })
    let illustrate = builder(props.data);
    console.log(illustrate)

    return (
      <div>
        <form id = "form2">
          <label for = "src">From</label>
          <input name = "src" type = "text" required = "required"></input>
          <label for = "des">To</label>
          <input name = "des" type = "text" required = "required" ></input>
          <button onClick = {props.click}>Submit</button>
        </form>
        <table>
          <tr>
            <th>*</th>
            {props.data.src.split("").map((cur) => (<th>{cur}</th>))}
          </tr>
  {td.map((cur,i) =>(<tr>{cur.map((val,j) => {
    if(optmz.indexOf([i,j-1].join(",")) !== -1){
      return (<td style = {{"background-color": "green"}}>{val}</td>)
    }
    else {
      return (<td>{val}</td>)
    }
  })}</tr>))}
        </table>
        <ol>
          <li>{props.data.src}<span>&larr;start</span></li>
          {
            illustrate.map(cur => (<li>{cur.head}<span style = {cur.style}>{cur.change}</span>{cur.tail}<span>&larr;{cur.comment}</span></li>))
          }
          <li>{props.data.des}<span>&larr;complete</span></li>
        </ol>
      </div>
    )
  }
  else return (
    <form id = "form2">
      <label for = "src">From</label>
      <input name = "src" type = "text" required = "required"></input>
      <label for = "des">To</label>
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
    fetch('/similar',{
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
      </div>

    );
  }
}
function reducer(state = {}, action){
  switch(action.type){
    case UPDATE:
      return {weather: action.dt};
      break;
    case ERROR:
      return {error: action.message};
      break;
    default:
      return state;
  }
}
const store = Redux.createStore(reducer);
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
const Provider = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(App);
ReactDOM.render(
  <Provider store = {store}/>, document.getElementById('App')
);

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