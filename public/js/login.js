// ****************************************************************************
// *                                login page                                *
// ****************************************************************************
'use strict';
var LoginForm = React.createClass({
  render: function() {
    return (
      <div className="login-form">
        <h1>SPACE-X</h1>
        <FacebookBtn />
        <TwiiterBtn />
      </div>
    );
  }
});

var FacebookBtn = React.createClass({
  render: function(){
    return(
      <a href="/auth/facebook"><button className="facebookBtn">facebook</button></a>
    )
  }
})

var TwiiterBtn = React.createClass({
  render: function(){
    return(
      <a href="/auth/twitter"><button className="twitterBtn">twitter</button></a>
    )
  }
})

var LoginSys = React.createClass({
  render:function(){
    return(
      <div>
        <LoginForm/>
      </div>
    )
  }
})

ReactDOM.render(
  <LoginSys />,
  document.getElementById('loginMain')
);


