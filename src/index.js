import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Year from './year.js';
import Moviereel from './moviereel.js'
import Clock from './clock.js'



class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      year: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    // To reference the method on App, you have to pass it as this.props.callBack to get access to the callback
    // this.props.onSubmit(this.state.term);
    this.props.handlerFromParent(this.state.value);
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <label>
        Search Movie:
        </label>
        <br />
        <input className="searching" type="text" value = {this.state.value} onChange = {this.handleChange}/>
        <br />
        <input className = "submit" type="submit" value="Submit" />
      </form>
    );
  };

}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
    this.updateData = this.updateData.bind(this);
    this.updateYear = this.updateYear.bind(this);

    this.state = {
      hits: [],
      rated: null,
      value: '',
      actors: [],
      year: "",
      poster: '',
    };
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.value !== this.state.value){
      this.updateData();
    }
    else if (prevState.year !== this.state.year) {
      this.updateData();
    }
  }


  updateData(){
    // console.log(this.state.value)
    const API = 'http://www.omdbapi.com/?t=' + this.state.value+'&y='+this.state.year+'&apikey=';
    const API_KEY = '7916cad4';
    fetch(API + API_KEY)
      .then(response => response.json())
      .then(data => this.setState({
        title: data["Title"],
        released: data["Released"],
        rated: data["Rated"],
        ratings: data["Ratings"][0].Value,
        source: data["Ratings"][0].Source,
        actors: data["Actors"].split(","),
        type: data["Type"],
        boxOffice: data["BoxOffice"],
        poster: data["Poster"],
        awards: data["Awards"],
        genre: data["Genre"]
      }));
  }


  changeValue(event) {
    this.setState({ value: event });
    // console.log(this.state.value);
  }

  updateYear(event){
    this.setState({ year: event});

  }

  render() {
  const {isLoading } = this.state;

  const actors = this.state.actors;
  const listItems = actors.map((actor) =>
    <li className = "actorList" key ={actor.toString()}>{actor}</li>
  );

  const moviePoster = <img alt = '' src = {this.state.poster}/>

  if (isLoading) {
    return <p>Loading ...</p>;
  }


  return (
    <div className = 'container'>
      <Clock />
      <div className = "header">
      <h1 className = "animated flipInX delay-1s">Movie Review</h1>
      </div>
      <div className = "theatre">
        <div className = "searchbar">
        <Search value={this.state.value} handlerFromParent = {this.changeValue}/>
        <Year value={this.state.year} handlerFromParent ={this.updateYear}/>
        <div className = "moviePoster">
          <div className = "moviescreen">
          {moviePoster}
          </div>
        </div>
        </div>
        <div className = "movieinfo">
          <div className = "movie_title">
          <h1>Movie Title: {this.state.title}</h1>
          </div>
          <div className = "movie_specifics">
          <h3>Type:</h3>
          <h4>{this.state.type}</h4>
          <h3>Genre: </h3>
          <h3>{this.state.genre}</h3>
          <h3>Rated:</h3>
          <h3>{this.state.rated}</h3>
        <h3>Rating: {this.state.ratings}</h3>
          <h3>Release Date:</h3>
          <h3>{this.state.released}</h3>
          </div>
          <div className = "contributions">
          <h3> Actors/Actresses:</h3>
          <ul>{listItems}</ul>
          </div>
          <div className = "credits">
          <h2>Box Office:</h2>
          <h3>{this.state.boxOffice}</h3>
          <h2>Awards:</h2>
          <h3>{this.state.awards}</h3>
          </div>
        </div>
      </div>
      <Moviereel />
    </div>
  );
}


}


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
