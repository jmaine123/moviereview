import React from 'react';
// import ReactDOM from 'react-dom';
import './index.css';

class Carousel extends React.Component{
  constructor (props) {
    super(props);

    this.state = {
      indexChange: 1
    };
    this.previousSlide = this.previousSlide.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
  }

  previousSlide(event){
    this.setState({indexChange: - 1});
    alert(this.state.indexChange);
    this.props.handlerFromParent(this.state.indexChange);
  }

  nextSlide(){
    this.setState({indexChange: 1});
    alert(this.state.indexChange);
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

class Moviereel extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      search: this.props.title,
      hits: [],
      showClass: "image-slide",
      hiddenClass:"hidden",
      firstImageIndex: 0,
      medium: "movie"
    }
    this.updateMovieReel = this.updateMovieReel.bind(this);
    this.switchtoTV = this.switchtoTV.bind(this);
    this.switchtoMovie = this.switchtoMovie.bind(this);
  }

  componentDidMount(){
    this.updateReel(this.state.medium);
    // want to show movies and tv reel//
    setInterval(this.autoreel(), 1000);
  }

  componentDidUpdate(){
    this.updateReel(this.state.medium);
  }

  switchtoTV(){
    // switch movie reel from movie to tv//
    this.setState({medium: "TV"});
    console.log(this.state.medium);
  }

  switchtoMovie(){
    this.setState({medium: "Movie"});
  }

  autoreel(){
    this.setState({firstImageIndex: this.state.firstImageIndex += 1})
  }

  updateMovieReel(event){
    // used to movie reel left to right
    if (this.state.firstImageIndex + 2 < this.state.hits.length - 1){
    this.setState({firstImageIndex: this.state.firstImageIndex += event});
    }
    else{
      this.setState({firstImageIndex: 0});
    }
    console.log(event);
  }

  updateReel(medium){
    const API = 'https://api.themoviedb.org/3/trending/'+medium+'/week?api_key=';
    const API_KEY = 'df778a42ee342c0ddeb2a39ee9b1ab9e';

    fetch(API + API_KEY)
      .then(response => response.json())
      .then(data => this.setState({
        hits: data["results"],
        homepage: 'http://image.tmdb.org/t/p/w185',
        poster: data['results'][this.state.firstImageIndex]["poster_path"],
        title: data['results'][this.state.firstImageIndex]["original_title"],
        overview: data['results'][this.state.firstImageIndex]["overview"]
      }));

  }

  render(){
    const movies = this.state.hits

    const moviereel = movies.map((movie) =>
    <img src={this.state.homepage + movie["poster_path"]} alt = ''/>
    );

    return(
    <div className = "moviereel">
      <h1>Trending Movies</h1>
      <div className = "switch">
        <button onClick = {this.switchtoTV}className = "mediumswitch">TRENDING TVSHOWS</button>
        <button onClick = {this.switchtoMovie} className = "mediumswitch">TRENDING MOVIES</button>
      </div>
      <div className="reel-image">
        <div className = "faded-image">
        {moviereel[this.state.firstImageIndex]}
        </div>
        <div className="nonfaded-image">
        {moviereel[this.state.firstImageIndex + 1]}
        </div>
        <div className="faded-image">
        {moviereel[this.state.firstImageIndex + 2]}
        </div>
      </div>
      < Carousel handlerFromParent = {this.updateMovieReel}/>
    </div>

    );
  };
}

export default Moviereel;
