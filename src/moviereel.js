import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function allMovies(props){

}

class Moviereel extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      search: this.props.title,
      hits: []
    }
  }

  componentDidMount(){
    this.updateReel();
  }

  allMovies(){

  }

  updateReel(){
    const API = 'https://api.themoviedb.org/3/trending/movie/week?api_key=';
    const API_KEY = 'df778a42ee342c0ddeb2a39ee9b1ab9e';

    fetch(API + API_KEY)
      .then(response => response.json())
      .then(data => this.setState({
        homepage: 'http://image.tmdb.org/t/p/w185',
        poster: data['results'][5]["poster_path"],
        title: data['results'][0]["original_title"],
        overview: data['results'][0]["overview"]
      }));

  }
  render(){
    const poster = this.state.homepage + this.state.poster
    return(
    <div className = "moviereel">
      <h1>Search Reel</h1>
      <h2>{this.state.title}</h2>
      <img src={poster} alt=""/>
      <p>{this.state.overview}</p>
    </div>

    );
  };
}

export default Moviereel;
