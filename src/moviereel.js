import React from 'react';
// import ReactDOM from 'react-dom';
import './index.css';

class Carousel extends React.Component{
  constructor (props) {
    super(props);

    this.state = {
      currentImageIndex: 0
    };
    this.previousSlide = this.previousSlide.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
  }

  componentDidUpdate(){

  }

  previousSlide(event){
    this.setState({currentImageIndex: this.state.currentImageIndex -= 1});
    alert(this.state.currentImageIndex);
    this.props.handlerFromParent(this.state.currentImageIndex);
  }

  nextSlide(){
    this.setState({currentImageIndex: this.state.currentImageIndex += 1});
    alert(this.state.currentImageIndex);
    this.props.handlerFromParent(this.state.currentImageIndex);

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
      currentImageIndex: 0,
    }
    this.updateMovieReel = this.updateMovieReel.bind(this);
  }

  componentDidMount(){
    this.updateReel();
  }

  updateMovieReel(event){
    this.setState({currentImageIndex: event});
  }

  updateReel(){
    const API = 'https://api.themoviedb.org/3/trending/movie/week?api_key=';
    const API_KEY = 'df778a42ee342c0ddeb2a39ee9b1ab9e';

    fetch(API + API_KEY)
      .then(response => response.json())
      .then(data => this.setState({
        hits: data["results"],
        homepage: 'http://image.tmdb.org/t/p/w185',
        poster: data['results'][this.state.currentImageIndex]["poster_path"],
        title: data['results'][this.state.currentImageIndex]["original_title"],
        overview: data['results'][this.state.currentImageIndex]["overview"]
      }));

  }
  render(){
    const poster = this.state.homepage + this.state.poster
    const movies = this.state.hits

    const moviereel = movies.map((movie) =>
    // <h2 key ={movie["original_title"]}>{movie["original_title"]}</h2>
    <img className= {this.state.currentClass} src={this.state.homepage + movie["poster_path"]} alt = ''/>
    );

    return(
    <div className = "moviereel">
      <h1>Search Reel</h1>
      {moviereel[this.state.currentImageIndex]}
      < Carousel handlerFromParent = {this.updateMovieReel}/>
    </div>

    );
  };
}

export default Moviereel;
