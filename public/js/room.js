// ****************************************************************************
// *                                 roomList                                 *
// ****************************************************************************
'use strict';

var Room = React.createClass({
  render: function() {
    return (
      <div>
        <Logout/>
      	<div> Room</div>
      	<div> userList</div>
      	
      </div>
    );
  }
});

var Logout = React.createClass({
  render: function() {
    return (
      <div>
        <a href="/"><button>logout</button></a>
      </div>
    );
  }
});
ReactDOM.render(
  <Room />,
  document.getElementById('roomMain')
);
