// ****************************************************************************
// *                                login page                                *
// ****************************************************************************
'use strict';
var LoginForm = React.createClass({
  render: function() {
    return (
      <div>
        <form action="">
          <input type="text" id="username"/>
          <input type="text" id="password"/>
          <button>ok</button>
        </form>
        <a href="/auth/facebook"><button>facebook</button></a>
        <a href=""><button>twitter</button></a>
      </div>
    );
  }
});

var LoginSys = React.createClass({
  render:function(){
    return(
      <div>
        <LoginForm/>
        <Register/>
      </div>
    )
  }
})
var Register = React.createClass({
  render:function(){
    return(
      <div>
        <form action="">
          <input type="text" id="newUsername"/>
          <input type="text" id="newPassword"/>
          <button>register</button>
        </form>
      </div>
    )
  }
})
ReactDOM.render(
  <LoginSys />,
  document.getElementById('loginMain')
);


