import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import { JSEncrypt } from 'jsencrypt';
import Header from './components/Header';
import Form from './components/Form';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import PopUp from './components/PopUp';
import LoginAgain from './components/LoginAgain';
// import toastr from 'toastr';
// import 'toastr/package/toastr.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const privkey = `MIIEogIBAAKCAQBxYkEm3zEsybhR2RTBhvo2Kt++dfwA836DD2asxcKFG22FOdb7
h/QKZM96s9tMkgu9OasMvowJciXyuclZKphv68MfvDskVo6ZrlFHsPr6PEtaMKmE
ZKp73qvjoltfe9fBCwqSF+HvlTwPmXyPme8j87iQ43Acp4Yyvzi5MPj0CqPGdds4
3sHS0R/cP+AOmTJOlzaGIDnqSB/EjbA1Giyct7Tx/G1uMevjqXCQYgCfg/cebwyD
RU+R/Ctkc/CfWnjrlU9i49oRi8Pi9sgcKzf785UNJnqOhuuGEQle2sJEyJ2l6T7k
3PWtINqfpeZXIJbEebQgV/r8Y/1+TB+alIhPAgMBAAECggEAb5vXJCtpXXwHKtIz
wzhZjf5wFixPbqRA8UO0vvc/vgS8rvq7awdtqtmG/nKSuPG+Cnr8q+PZNucdAavt
zg7G1MzPWqrP0Lo/Tnmv2pEUzEOTrOjfxMnOo3YR31YO+ZOPUp/KvPozVcGhyH0+
hqBxLQOYt06aKiqhR8zBSlIxjQ6oTAYIz+On3LGcbGF8malAXTNwm3/kfa0wbOA5
je9+nn78Jf282WA0RMxT4gEyz10xJ/66RwZHbVaDW4Z/5Uc5q57arEX6jkmoPLsr
ZKVVy6cT0AlM9HIcG4j0QADFnSUqGQp2GAMRpUeuXd6XS5IYqhzNtlEWbGr/iImx
nYmCYQKBgQCy+5z1ew7t1uXkmxLVfzDzB4MvhKDckxBpuX33alrK4DC4wpVlo/96
0s5IeqbLhQOFvSMhtENMnFiV7aol+S4XG9IEzy6mXB+kMZD2W2n4OdTIETJhTSfg
w9j+O+/ilTO8frz8WK8ZHxzSEEb2CEIURj/y/h4/GpJ3AGzaiUTFfwKBgQCiLGIX
Nvl8BV+dHwhs+Uxfpj09NJFYV6K0VSW0YOqYM5wtZHKH/2p4wql6f18Zf2h11fMZ
7OgrCHkNekXjGEYb3uFLae5HaQoUnKRO07l5Lw8br/W2uySJ9uTjZ+H7d+crZDYX
yHskUgJykD9+PPuAVmLFib1lTajj1xhIL5DFMQKBgClaZSt6oTpmmns1MSbO2lps
c+z4scoE2Jf02ZveoNea8ObfXnE7cP3J0wt/+yWut9+gkYtqANqkjPsnDFb1uaZx
MRcXX2nkgxMGuL2S5WsKwZTwFDnS/9G4rlwfMQ+i9W8pwTR0sRAW1ivawup5gfr5
ODFGcWqXExwXpw7fBFq1AoGBAIPzDsCKt0Ukbh4+ILHhyTVN4ifJfLTfYP/PA8WW
0WmTHHCGePWUaMHmyNRljDAHzSuLL6gZbPGOjEfeA7z5hBmrJ64fe4NYwJ3ysXF9
rTwfgPBrI8ZQ0DL80lEAtgrQDSPt/mEtepwbqegi27ZP0eYi42yMXLBvFoqC+TvK
j8URAoGABxX3d5qVu2Vduj/kmwV/ZadjNi9CSkJ4QbOYBOIoe7gMzkuer/CSl5yK
BfFbod/ScSnGemhj2jBIC300yBH5/01OShirjpR8vJ/mPvglsKYiJ7dv8ji9y9rw
uUxxbV0AwHVTZNlmPk+y1tQdl/uc1VD72oQg06y6mG0VH2MEQ1k=`;
let popup, loginagain = null;
let expIn, decodedPayload = null;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tran_id: '',
      expIn: ''
    }
  }
  showPopUp = () => {
    popup = <PopUp expIn={this.state.expIn} handleClosePopUp={this.handleClosePopUp} handleNo={this.loginAgain} />
    this.forceUpdate();
    window.setTimeout(this.loginAgain, 5000);
  };
  handleClosePopUp = () => {
    popup = null;
    this.forceUpdate();
    window.setTimeout(this.loginAgain, 5000);
  }
  loginAgain = () => {
    popup = null;
    loginagain = <LoginAgain />
    this.forceUpdate();
  };

  componentWillMount = () => {
    // console.log(window);
    let updateState = () => {
      this.setState(prevState => {
        return {
          tran_id: decodedPayload.tran_id,
          expIn: expIn
        };
      });
    }
    let checkHost = (e) => {
      if (e.origin !== "http://localhost:3001")
        return;
      console.log(e.data);
      console.log(e.origin);
      let token = e.data;
      let crypt = new JSEncrypt();
      crypt.setPrivateKey(privkey);
      token = crypt.decrypt(token);
      console.log(token);
      decodedPayload = jwt_decode(token);
      console.log(decodedPayload);
      expIn = (decodedPayload.exp - decodedPayload.iat - 5);
      console.log(expIn);
      updateState();
      window.setTimeout(this.showPopUp, this.state.expIn * 1000);
    }
    window.addEventListener('message', checkHost);
    
  }
  render() {
    let form = null;
    if (this.state.tran_id === '012345678'){
      form = <Form />
    } else 
    form = NotificationManager.warning('You are not authorised to access this page.', 'Unauthorised');
    return (
      <div>
        {form}
        {popup}
      </div>
    );
  }
}

export default App;
