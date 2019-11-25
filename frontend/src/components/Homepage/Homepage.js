import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Link
} from 'react-router-dom';

import axios from 'axios';


class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputValue : '',
            data : [],
            isLoading : false,
        };
        this.click = this.click.bind(this);
    }

    click() {
        this.setState({ isLoading : true });
        axios
            .get(`http://127.0.0.1:8000/film/api/search/${this.state.inputValue}/`)
            .then((response) => {
                this.setState({ data : response.data, isLoading : false});
                console.log(response);
            })
            .catch((err) => {
                this.setState({ data : err, isLoading : false});
                console.log(err);
            });
    }

    updateInputValue = (event) => {
        this.setState({
            inputValue : event.target.value
        });
    }

    render(){
        return (
              <div>
                  <form onSubmit={this.handleSubmit}>
                  <h1> Ricerca Film </h1>
                    <label>
                        Inserisci un titolo:
                    <input
                        type="text"
                        value={ this.state.inputValue }
                        onChange = { this.updateInputValue}
                        placeholder = "Titolo"
                     />
                    </label>
                    <button onClick = { this.click } disabled = {this.state.isLoading}> Invia </button>
                    <div>
                        <ul>
                            {this.state.data.map( film => {
                                return <li key={film.title}> {film.title} </li>;
                            })}
                        </ul>
                    </div>
                   </form>

                   <Router>
                   <div>
                        <ul>
                            <li>
                                <Link to="/films"> Lista Film </Link>
                            </li>
                        </ul>

                         <div>
                        <Switch>
                            <Router path = '\films'>
                                <ViewAllFilm />
                            </Router>
                        </Switch>
                        </div>
                    </div>
                   </Router>
                </div>
        );
    }

}

    function ViewAllFilm(){
        return (
            <h4> Lista Film </h4>
        );
    }


export default HomePage