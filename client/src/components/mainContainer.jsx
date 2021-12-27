import React from 'react';
import { Link, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScreenA from './screenA';
import ScreenB from './screenB';
import initialData from "../seeds";

class MainContainer extends React.Component {
    state = initialData;

    constructor(props) {
        super(props);

        this.handler = this.handler.bind(this);
    }

    componentDidMount(){
        this.fetchData();
    }

    handler(newState)
    {
        this.setState(newState);
    }

    handleIncrement = result => {
        const { results } = this.state;
        results[result.id].result++;
        this.setState( results );
    };

    fetchData(){
        fetch("/api/results").then(res => {
            if(res.ok) {
                return res.json();
            }
        }).then(
            (jsonRes) => {
                const newState = {
                    results: {},
                    columns: {
                        'column-1': {
                            id: 'column-1',
                            title: 'Results',
                            resultIds: [],
                        }
                    }
                };
                jsonRes.forEach(result => {
                    const resultId = result._id.toString();
                    newState.results[resultId] = {}
                    newState.results[resultId].id = resultId;
                    newState.results[resultId].result = result.solution;
                    newState.results[resultId].title = result.title;
                    newState.results[resultId].filePath = result.filePath;
                    newState.columns['column-1'].resultIds.push(resultId);
                });

                this.setState(newState);
            }
        )
    }

    render() { 
        return (
            <Router>
                <Routes>
                    <Route exact path="/" element={<ScreenA results={this.state.results} columns={this.state.columns} handler={this.handler} onIncrement={this.handleIncrement} />} />
                    <Route exact path="/screenb" element={<ScreenB results={this.state.results} columns={this.state.columns} handler={this.handler} onIncrement={this.handleIncrement} />} />
                </Routes>
            </Router>
        );
    }
}
 
export default MainContainer;