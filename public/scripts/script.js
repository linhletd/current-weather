const SearchBar = (props) => {
  var style = props.getGeo === true ? {display:"none"} : {display: "block"}
  return (
      <div id = "search-bar">
        <input style = {style} id = 'find' name = 'q' placeHolder = 'e.g: thai nguyen'></input>
        <button id = 'findIcon' ><i className="fa fa-search"></i></button>
        <button id = 'mylocation' ><i className="fa fa-map-marker"></i></button>
      </div>
    )
  }
const WeatherShow = (props) => {
  var style = props.data === true ? {display:"block"} : {display: "none"}
  return (
    <div style = {style} >
     <h2>this is place to show current weather</h2>
    </div>
  )
}
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      getGeo: true,
      data: false,
      input: ''
    }

  }
  handleClickFind(){
    if(this.state.getGeo === true){
      this.setState({getGeo: false})
    }
    else if(this.state.input){
      
    }
  }
  render() {
    return (
      <div>
        <h2>COOL WEATHER APP</h2>
        <SearchBar getGeo = {this.state.getGeo}/>
        <WeatherShow data = {this.state.data}/>
      </div>
    );
  }
}
function reducer(state = {}, action){
  return state
}
const store = Redux.createStore(reducer);
const Provider = ReactRedux.connect(null, null)(App);
ReactDOM.render(
  <Provider store = {store} />,
  document.getElementById('App')
);
function fetchData(option){
  return fetch('/apis',{
    method: 'POST',
    headers:{'Content-Type': 'application/json'},//'application/x-www-form-urlencoded' 'application/json'
    cache: 'no-cache',
    body: JSON.stringify(option) // 'lat=21.5252992&lon=105.8865151999' for urlencoded
  }).then(data => data.json())
    .catch((err) => {
      document.getElementById('message').innerText = 'err'
    });
}
async function getByLonLat(e){
  e.preventDefault();
  document.getElementById('find').style.display = 'none'
    var position = await new Promise((resolve, reject) => {navigator.geolocation.getCurrentPosition(resolve, reject)})
    .catch(err => {console.log('you have denied this page to access your location, please go to chrome://settings/content/location to anable')});
    if(position){
      var pos = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
      }; 
      console.log(pos);
      let response = await fetchData(pos)
        console.log(response)
        document.getElementById('message').innerText = JSON.stringify(response.city);  
    }
 }
 async function getByInput(e){
    e.preventDefault();
    if(document.getElementById('find').style.display == 'none'){
      document.getElementById('find').style.display = 'block';
    }
    else{
      let form = new FormData(document.getElementById('myform'));
      let loc = {};
      for (elem of form.entries()){
        loc[elem[0]] = elem[1];
      }
      console.log(loc);
      let response = await fetchData(loc);
      console.log(response)
      document.getElementById('message').innerText = JSON.stringify(response.city);
    }
 }
//  document.getElementById('mylocation').addEventListener('click', getByLonLat);
//  document.getElementById('findIcon').addEventListener('click', getByInput)
//  getLonLat();
//