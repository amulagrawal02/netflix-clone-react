
import './App.css';
import Row from './Row.js'
import requests from './requests'

const data = async () =>{
  let Moviedata = await fetch("https://api.themoviedb.org/3/movie/550?api_key=dee58ae908c209ae72a973b08992e76f")
  if(Moviedata.ok)
  {
    let json = await Moviedata.json()
    console.log(json)
  }
}
 

function  App() {
  return (
    <div>
      <Row title = "NETFLIX ORGINALS" fetchUrl = {requests.fetchNetflixOriginals}/>
      <Row title = "Treading Now" fetchUrl = {requests.fetchTrending}/>
    </div>
    
  );
}

export default App;
