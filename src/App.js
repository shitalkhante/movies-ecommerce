import {useEffect, useState} from "react";
import './App.css';
import axios from "axios";

function App() {

  const [state,setState] = useState([])
  const [fav,setFav] = useState({})
  const [srch,setSrch] = useState("");

  function getdata(){
    axios.get("https://api.themoviedb.org/3/movie/top_rated?api_key=432bc6d32eedb66a6d29735d6dd4adef&language=en-US&page=1")
    .then(data=>{
      setState(data.data.results.slice(0,10));
      console.log(state);
    })
    .catch(err=>{
      alert(err);
    })
  }

  useEffect(()=>{
    getdata();
    setState(state.filter((ele)=>{
        return ele["title"].includes(srch)
      }))
      console.log("filt",state);
  },[srch])


  return (
    <div className="App">
      <div className="movies">
        <span id="txt_mv">Movies</span>
        <input type={"text"} id="search" value={srch} onChange={(event)=>{
          setSrch(event.target.value)
        }}/>
        <div className="mv-post">
        {state.length>0 &&
          state.map((data)=>{
          return(<div className="post" onh={()=>{
            return(<button>Add</button>)
          }}>
          <img src={`https://image.tmdb.org/t/p/original${data.poster_path}`} alt="img"/>
          <div>
            
              <h4>{data["title"]}</h4>
            <h6>{data.vote_average} Rated</h6>
            
            </div>
         </div> )
          })
        }
        </div>
       
      </div>
      <div className="fav">
        <p id="txt_fv">Favourites</p>
      </div>
    </div>
  );
}

export default App;
