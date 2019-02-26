import React from 'react';
import './index.css';

class Trailer extends React.Component{
    state = {
      movie_id: this.props.movie_id,
      video_url:'https://www.youtube.com/embed/',
    }

  componentDidUpdate(prevProps, prevState){
    if (prevProps.movie_id !== this.props.movie_id){
      this.updateTrailer(this.props.movie_id, this.props.medium);
      console.log(this.props.movie_id)
    }
  }

  updateTrailer(id, medium){
    const API = 'https://api.themoviedb.org/3/'+medium+'/'+ id +'/videos?api_key=';
    const API_KEY = 'df778a42ee342c0ddeb2a39ee9b1ab9e';

    fetch(API + API_KEY)
      .then(response => response.json())
      .then(data => this.setState({
        key:data["results"][0]["key"],
      }));
  }

  render(){
    const video =
    <iframe width="720" height="420"
    src={this.state.video_url + this.state.key+'?rel=0;autoplay=0'} allow='autoplay' allowFullScreen>
    </iframe>;
    return(
      <div className="trailervideo">
      {video}
      </div>
    );
  };

}

export default Trailer
