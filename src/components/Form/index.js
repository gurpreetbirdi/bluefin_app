import React, { Component } from 'react';

class Form extends Component{

    constructor(props) {
        super(props);
        this.state = {
            cardNo: ''
        }
    }

    handleOnchange = (e) => {
        let value = e.target.value;
        this.setState(prevState => {
            // console.log(prevState);
            return { cardNo: value };
        });
    }

    render(){
        return(
            <div>
                <form>
                    <input type='text' placeholder='credit card no.' value={this.state.cardNo} 
                    onChange={this.handleOnchange} />
                </form>
            </div>
        );
    }
}
export default Form;