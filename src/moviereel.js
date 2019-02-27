import React from 'react';
// import ReactDOM from 'react-dom';
import './index.css';
import Trailer from './trailer.js'

class Carousel extends React.Component{
  constructor (props) {
    super(props);

    this.state = {
      indexChange: 1
    };
    this.previousSlide = this.previousSlide.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
  }

  previousSlide(){
    this.setState({indexChange: - 1});
    this.props.handlerFromParent(this.state.indexChange);
  }

  nextSlide(){
    this.setState({indexChange: 1});
    this.props.handlerFromParent(this.state.indexChange);

  }

  render () {
    const Arrow = ({ direction, clickFunction, glyph }) => (
      <div
        className={ `slide-arrow ${direction}` }
        onClick={ clickFunction }>
        { glyph }
      </div>
    );

    return (
      <div className="carousel">
        <Arrow
          direction="left"
          clickFunction={ this.previousSlide }
          glyph="&#9664;" />

        <Arrow
          direction="right"
          clickFunction={ this.nextSlide }
          glyph="&#9654;" />
      </div>
    );
  }
}

  function TvMedium(props){
    return (
      <button onClick={props.onClick} className = "mediumswitch">
        TRENDING TV SHOWS
      </button>
    );
  }

  function MovieMedium(props){
    return (
    <button onClick={props.onClick} className = "mediumswitch">
      TRENDING MOVIES
    </button>
  );
  }

  function PersonMedium(props){
    return (
    <button onClick={props.onClick} className = "mediumswitch">
      TRENDING ACTORS/ACTRESS
    </button>
  );
  }

class Moviereel extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      hits: [],
      firstImageIndex: 0,
      medium: "movie",
      movie_id: ''
    }
    this.updateMovieReel = this.updateMovieReel.bind(this);
    this.switchtoTV = this.switchtoTV.bind(this);
    this.switchtoMovie = this.switchtoMovie.bind(this);
    this.switchtoPerson = this.switchtoPerson.bind(this);
    this.autoreel = this.autoreel.bind(this);
  }

  componentDidMount(){
    this.updateReel(this.state.medium);
    // want to show movies and tv reel but not currently working//
    setInterval(this.autoreel, 10000);
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.medium !== this.state.medium){
      this.updateReel(this.state.medium);
    }
  }


  switchtoTV(){
    // switch movie reel from movie to tv//
    this.setState({
      medium: "tv",
      firstImageIndex:0
    });

  }

  switchtoMovie(){
    // switch movie reel from tv to movie//
    this.setState({
      medium: "movie",
      firstImageIndex: 0
  });
  }

  switchtoPerson(){
    // switch movie reel to person//
    this.setState({
      medium: "person",
      firstImageIndex: 0,
  });
  }



  autoreel(){
    //used to move movie reel to the right on its own with time interval//
    if (this.state.firstImageIndex + 2 < this.state.hits.length - 1){
      this.setState({firstImageIndex: this.state.firstImageIndex += 1});
    }
    else{
      this.setState({firstImageIndex: 0});
    }

  }

  updateMovieReel(event){

    // used to movie reel left to right
    if (this.state.firstImageIndex + 2 < this.state.hits.length - 1){
      this.setState({
        firstImageIndex: this.state.firstImageIndex += event,
        medium: this.state.medium,
      });
    }
    else if (this.state.firstImageIndex < 0) {
      this.setState({firstImageIndex: this.state.hits.length - 1})
    }
    else{
      this.setState({firstImageIndex: 0});
    }
  }

  updateReel(medium){
    const API = 'https://api.themoviedb.org/3/trending/'+medium+'/week?api_key=';
    const API_KEY = 'df778a42ee342c0ddeb2a39ee9b1ab9e';
    if (medium == "person"){
      fetch(API + API_KEY)
        .then(response => response.json())
        .then(data => this.setState({
          hits: data["results"],
          homepage: 'http://image.tmdb.org/t/p/w500',
          video_url:'https://www.youtube.com/watch?v=',
        }));
    }
    else {
      fetch(API + API_KEY)
        .then(response => response.json())
        .then(data => this.setState({
          hits: data["results"],
          movie_id:data["results"][this.state.firstImageIndex]["id"],
          homepage: 'http://image.tmdb.org/t/p/w500',
          video_url:'https://www.youtube.com/watch?v='
        }));
    }
  }

  render(){
    const photos = this.state.hits
    // console.log(this.state.movie_id)
    let moviereel
    if (this.state.medium == "person"){
      moviereel = photos.map((photo) =>
      <img src={this.state.homepage + photo["profile_path"]} alt = ''/>
      );

      console.log(photos);
      console.log(this.state.medium)
    }
    else {
      moviereel = photos.map((photo) =>
      <img src={this.state.homepage + photo["poster_path"]} alt = ''/>
      );
    }


    let mediumbutton;
    if (this.state.medium === "movie"){
      mediumbutton = <TvMedium onClick = {this.switchtoTV} />;
    }
    else if (this.state.medium === "tv"){
      mediumbutton = <PersonMedium onClick = {this.switchtoPerson} />;
    }
    else{
      mediumbutton = <MovieMedium onClick = {this.switchtoMovie} />;
    }


    return(
    <div className = "moviereel">

      <div className = "switch">
        {mediumbutton}
      </div>
      <div className="reel-image w3-animate-fading">
        <div className = "nonfaded-image">
        {moviereel[this.state.firstImageIndex]}
        </div>
        <div className="faded-image">
        {moviereel[this.state.firstImageIndex + 1]}
        </div>
        <div className="faded-image">
        {moviereel[this.state.firstImageIndex + 2]}
        </div>
      </div>

      < Carousel handlerFromParent = {this.updateMovieReel}/>
      <Trailer movie_id = {this.state.movie_id} medium = {this.state.medium}/>
    </div>

    );
  };
}

export default Moviereel;
