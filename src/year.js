import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';



function Yearlist(props){
  let start = 1990;
  let end = 2019;

  const years = []
  var i;
  for(i = 1990; i < end; i++){
    years.push(i)
  }
  const yearList = years.map((year) =>
  <option key ={year.toString()} value={year.toString}>{year}</option>);
  return (
    {years}
  );

}

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
    alert('year: ' + this.state.year);
    event.preventDefault();
    // To reference the method on App, you have to pass it as this.props.callBack to get access to the callback
    // this.props.onSubmit(this.state.term);
    this.props.handlerFromParent(this.state.year);
  }

  render(){
    return(
      // <form onSubmit={this.handleSubmit}>
      //   <label>Year:</label>
      //   <br />
      //   <input className="yearsearch" type="text" value = {this.state.year} onChange = {this.handleChange}/>
      //
      //   <input type="submit" value="Submit" />
      // </form>
      <form onSubmit= {this.handleSubmit}>
        <label>Year:</label>
        <select className = "yearsearch" value = {this.state.year} name="year" onChange = {this.handleChange}>
          <option value=" "></option>
          <option value="2002">2002</option>
          <option value="2003">2003</option>
          <option value="2004">2004</option>
          <option value="2005">2005</option>
        </select>
        <input type="submit" value="Submit" />
        <Yearlist />
      </form>


    );
  };

}

export default Year;