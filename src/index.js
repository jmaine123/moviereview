import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Year from './year.js';



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
        <input type="submit" value="Submit" />
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
      value: 'Lion King',
      actors: [],
      year: "",
      poster: 'http://pngimg.com/uploads/tv/tv_PNG39263.png'
    };
  }

  componentDidUpdate(){
    this.updateData();
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
        poster: data["Poster"]
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
  const { title, isLoading } = this.state;

  const actors = this.state.actors;
  const listItems = actors.map((actor) =>
    <li key ={actor.toString()}>{actor}</li>
  );

  const moviePoster = <img alt = '' src = {this.state.poster}/>

  if (isLoading) {
    return <p>Loading ...</p>;
  }


  return (
    <div>
      <div className = "header">
      <h1>Movie Rating</h1>
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
          <h1>{this.state.title}</h1>
          <h3>Type: {this.state.type}</h3>
          <h2>{this.state.rated}</h2>
          <h2>{this.state.source}</h2>
        <p>{this.state.ratings}</p>
          <h3>{this.state.released}</h3>
          <ul>{listItems}</ul>
          <h2>{this.state.actors}</h2>
          <h2>{this.state.boxOffice}</h2>
        </div>
      </div>
    </div>
  );
}


}


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
