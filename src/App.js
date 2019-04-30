import React, { Component } from 'react';
import { withData } from './DataProvider';

class App extends Component {
  constructor(){
    super()
    this.state={
      search: ""
    }
  }

  componentWillMount(){
    this.props.getMovie()
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({
      search: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.getMovie(this.state.search)
    this.setState({
      search: ""
    })
  }

  render() {
    const styles={
      box:{
        textAlign:"center",
        width: 300,
        display:"block",
        margin:"auto",
        height: 350,
        overflowY:'scroll',
        marginTop: 30,
        border:"red solid",
        borderRadius: 10,

      },
      form:{
        textAlign:"center",
        zoom: 2.3,
        paddingTop: 15,
      },
      button:{
        display: "block",
        margin: "auto",
        marginTop:"1em",
        zoom: 1.2,
        border:"red solid",
        borderRadius: 5,
        outline: "none"
      },
      title:{
        textAlign:"center", 
        width: "100%", 
        display:"block",
        margin:"auto",
        backgroundColor: '#000000a6',
        padding: 10,
        color: "white"
      }
    }
    const mappedMovie = this.props.movie.Similar && this.props.movie.Similar.Results.map(person => {
      if (this.props.movie.Similar.Info[0].Name === 'Undefined' || this.props.movie.Similar.Results === 'unknown'){
        return null
      }else{
        return (
          <div>
            <h1 style={{backgroundColor:'white', margin:0, padding: "3.5% 0%"}}>{person.Name}</h1>
            <hr style={{margin:0}}/>
          </div>
        )
      }
    })
    return (
      <div>
        <h1 className="title" style={styles.title}>Find a new movie with a familiar plot!</h1>
        <form style={styles.form} onSubmit={this.handleSubmit} action="">
          <input 
            style={{outline:"none", borderRadius: 2, border: "red solid", textAlign:"center"}}
            type="text" 
            name="search" 
            value={this.state.search}
            onChange={this.handleChange}
            autoFocus
            autoComplete='off'
            placeholder="Search a favorite movie"
            required
          />
        <br/>
          <button className='button' style={styles.button}>Search</button>
        </form>
        <div style={styles.box}>
          {mappedMovie}
        </div>
      </div>
    );
  }
}

export default withData(App);