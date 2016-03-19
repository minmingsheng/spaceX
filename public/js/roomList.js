// ****************************************************************************
// *                                 roomList                                 *
// ****************************************************************************
'use strict';

var Room = React.createClass({
  render: function() {
    return (
      <div>
      	<div id="jason"> roomList</div>
      	<div> userList</div>
      	<div> createRoom</div>
      </div>
    );
  }
});

ReactDOM.render(
  <Room />,
  document.getElementById('roomMain')
);
