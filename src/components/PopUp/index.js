import React, {Component} from 'react';
import './index.css';

class PopUp extends Component {
    render(){
    return (
        <div className="popup-container">
            <div className="modal">
                <div className="modal-content">
                    <div>
                        <span className="close" onClick = {this.props.handleClosePopUp}>&times;</span>
                        <div>
                            <h4>your session Expiresin {this.props.expIn} seconds. </h4>
                        </div>
                        <div>
                            <p>Do you want to continue?
                            <button>Yes</button>
                            <button onClick={this.props.handleNo}>No</button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
}

export default PopUp;
