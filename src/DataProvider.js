import React, { Component } from 'react';
import axios from "axios"
const { Provider, Consumer } = React.createContext()

class DataProvider extends Component {
    constructor(){
        super()
        this.state={
            movie: []
        }
    }

    getMovie = (movie)=> {
        axios.get(`https://vschool-cors.herokuapp.com?url=https://tastedive.com/api/similar?q=${movie}&k=${process.env.KEY}`).then(res => {
            this.setState({
                movie: res.data
            })
        }).catch(function (error) { 
            window.location.reload() 
        });
    }

    render() {
        return (
            <Provider value={{
                getMovie: this.getMovie,
                ...this.state
            }}
            >
                {this.props.children}
            </Provider>
        );
    }
}

export default DataProvider;

export function withData(C) {
    return props => <Consumer>{value => <C {...value}{...props} />}</Consumer>
}