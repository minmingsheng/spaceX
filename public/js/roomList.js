// ****************************************************************************
// *                                 roomList                                 *
// ****************************************************************************
'use strict';

var Room = React.createClass({
  render: function() {
    return (
      <div>
        <Logout/>
      	<div id="jason"> roomList</div>
      	<div> userList</div>
      	<div> createRoom</div>
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
