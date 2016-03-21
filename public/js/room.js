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
        <BackToRoomList/>
      </div>
    );
  }
});
var BackToRoomList = React.createClass({
  render: function() {
    return (
      <div>
        <a href="/roomList"><button>roomList</button></a>
      </div>
    );
  }
});
ReactDOM.render(
  <Room />,
  document.getElementById('roomMain')
);
