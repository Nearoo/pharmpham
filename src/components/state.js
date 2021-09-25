import React, { Component } from 'react';

export const AppStateContext = React.createContext({});

export class AppStateProvider extends Component {
    constructor({props}){
        super();
        // Add default fields & functions to change state
        this.state = {
            setX: this.setX,
            x: 2
        }
    }

    componentDidUpdate = () => {
        this.x = 2;
    }

    setX = () => {
        this.setState({x: 3})
    }


    render = () => {
        return <AppStateContext.Provider value={this.state}>
            {this.props.children}
        </AppStateContext.Provider>
    }
}