import React from 'react';
// import ReactDOM from 'react-dom';
import './index.css';


class Year extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      year: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({year: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    // To reference the method on App, you have to pass it as this.props.callBack to get access to the callback
    // this.props.onSubmit(this.state.term);
    this.props.handlerFromParent(this.state.year);
  }

  render(){
    let start = 1990;
    let end = 2019;

    const years = []
    var i;
    for(i = start; i < end; i++){
      years.push(i)
    }
    const yearList = years.map((year) =>
    <option key ={year.toString()} value={year.toString()}>{year}</option>);
    return(
      <form onSubmit= {this.handleSubmit}>
        <label>Year:</label>
        <select className = "yearsearch" value = {this.state.year} name="year" onChange = {this.handleChange}>
          <option value=" "></option>
          {yearList}
        </select>
        <br />
        <input className = "submit" type="submit" value="Submit" />

      </form>


    );
  };

}

export default Year;
