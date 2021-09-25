import React, { Component } from 'react';

export const AppStateContext = React.createContext({});

export class AppStateProvider extends Component {
    constructor({props}){
        super();
        // Add default fields & functions to change state
        this.state = {
            setX: this.setX,
            x: 2,
            setView: this.setView,
            loadManual: this.loadManual,
            loadProduct: this.loadProduct 
        }
    }

    componentDidUpdate = () => {
        this.x = 2;
    }


    setView = (view) => {
        this.setState({view})
    }

    loadManual = (id) => {
        const path = '/md_example.md'
        fetch(path).then(r => r.text()).then(text => this.setState({manual: text}));
    }

    loadProduct = (inst_id) => {
        this.setState({expiry:'5/6/2027'})
        console.log(this.state)
    }

    setX = () => {
        this.setState({x: 3});
        // fetch(path).then(r => r.text()).then(text => setContent(text));z
    }

    loadProp


    render = () => {
        return <AppStateContext.Provider value={this.state}>
            {this.props.children}
        </AppStateContext.Provider>
    }
}