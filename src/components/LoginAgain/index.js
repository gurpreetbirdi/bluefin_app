import React, { Component } from 'react';
import './index.css';

class LoginAgain extends Component {
    render() {
        return (
            <div className="popup-container">
                <div className="modal">
                    <div className="modal-content">
                        <div>
                            <div>
                                <h4>your session Expires. </h4>
                            </div>
                            <div>
                               <button>Login Again</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginAgain;
