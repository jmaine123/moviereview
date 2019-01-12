import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';



class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Movie search: ' + this.state.value);
    event.preventDefault();
    // To reference the method on App, you have to pass it as this.props.callBack to get access to the callback
    // this.props.onSubmit(this.state.term);
    this.props.handlerFromParant(this.state.value);
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <label>
        Search Movie:
        </label>
        <br />
        <input type="text" value = {this.state.value} onChange = {this.handleChange}/>
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

    this.state = {
      hits: [],
      rated: null,
      value: 'Lion King',
      actors: []
    };
  }

  componentDidMount() {
  }

  componentDidUpdate(){
    this.updateData();
  }


  updateData(){
    // console.log(this.state.value)
    const API = 'http://www.omdbapi.com/?t=' + this.state.value+ '&apikey=';
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

  characters(){

  }

  render() {
  const { title, isLoading } = this.state;

  const actors = this.state.actors;
  const listItems = actors.map((actor) =>
    <li key ={actor.toString()}>{actor}</li>
  );

  const moviePoster = <img src = {this.state.poster}/>

  if (isLoading) {
    return <p>Loading ...</p>;
  }


  return (
    <div className = "theatre">
      <div className = "searchbar">
      <Search value={this.state.value} handlerFromParant = {this.changeValue}/>
      </div>
      <div className = "movieinfo">
      <h1>{this.state.title}</h1>
      <h3>Type: {this.state.type}</h3>
      <h2>{this.state.rated}</h2>
      <h2>{this.state.source}</h2>
      <p>{this.state.ratings}</p>
      </div>
      <div className = "moviedetails">
      <h3>{this.state.released}</h3>
      <ul>{listItems}</ul>
      <h2>{this.state.actors}</h2>
      <h2>{this.state.boxOffice}</h2>
          {moviePoster}
      </div>

    </div>

  );
}


}


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
