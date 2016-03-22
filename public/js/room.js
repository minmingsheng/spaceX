// ****************************************************************************
// *                                 roomList                                 *
// ****************************************************************************
'use strict';
var userPic = document.getElementById("pppccc").textContent;
var roomId = document.getElementById("roomId").textContent;
var userName = document.getElementById("profileName").textContent;
var userId = document.getElementById("profileId").textContent;


console.log("roomId: ", roomId);
console.log("userPic: " ,userPic);
console.log("userName: ",userName );
console.log("userId: ", userId);


var Room = React.createClass({
  render: function() {
    return (
      <div className = "play-room">
        {/*<Logout/>*/}
          <Chat/>
          <UserList/>
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
// ****************************************************************************
// *                                   user                                   *
// ****************************************************************************

var UserList = React.createClass({

  render: function() {
    return (
      <div className = "play-userList">
        UserList
        <Users/>
      </div>
    )
  }
})
        var Users = React.createClass({
          getInitialState: function(){
            return {users: []};
          },
          updateList: function(){
            var that = this;
            socket.on("PlayroomUserList", function(data){
              var userList = JSON.parse(data);
              console.log(userList);
              that.setState({users: userList});
              console.log("state: ", that.state.users);
            })
          },
          componentDidMount: function(){
            this.updateList();
          },
          render: function() {
            var kk = this.state.users.map(function(el){
              console.log(el);
              return (
                <User src={el.userPic} key = {el.socketId} >{el.userName}</User>
              )
            })
            return (
              <div className = "play-user">
                  {kk}
              </div>
            )
          }
        })
                
                  var User = React.createClass({
                    getInitialState: function(){
                      return({
                        number: 0,
                        active: false
                      })
                    },
                    ready: function(e){
                      console.log(e.currentTarget.querySelector("img"));
                      if(this.state.active){
                        e.currentTarget.querySelector("img").style.opacity = "0.6";
                        this.setState({
                          active:false,
                          number: this.state.number-1
                        })
                      }else{
                        e.currentTarget.querySelector("img").style.opacity = "1";
                        this.setState({
                          active:true,
                          number: this.state.number+1
                        })
                      }
                    } ,
                    render: function(){
                      return (
                        <div className="user" key = {this.props.key} onClick = {this.ready} >
                            <img src={this.props.src}/>
                            <p>{this.props.children}</p>
                        </div>
                      )
                    }
                  })

// ****************************************************************************
// *                                   chat                                   *
// ****************************************************************************

var Chat = React.createClass({
  getInitialState: function(){
    return ({
      shake: false
    })
  },
  getSMS: function(e){
    var data = e.currentTarget.value
    console.log(e.keyCode);
    if(e.keyCode == 13){
      socket.emit("sendPlaySms", {
        sms : data,
        roomId ,
        userPic ,
        userName,
        userId
      });
      e.currentTarget.value= "";
    }
  },
  handleShake: function(e){
    socket.emit("shake", {
      userPic : userPic,
      roomId : roomId,
      userName : userName,
      userId : userId
    });
  },
  waitForShakeP: function(){
    var that = this;
    socket.on("shakePermission", function(data){
      that.setState({
        shake: true
      });
      setTimeout(function(){
        that.setState({
          shake: false
        });
      }, 2000)
    })
  },
  c:function(){
    return this.state.shake==false? "play-chat" : "play-chat shake"
  },
  componentDidMount: function(){
    this.waitForShakeP();
  },
  render: function() {
    var that = this;
    return (
      <div className = {this.c()}>
        <DialogFeed />
        <div className="play-input">
          <input type="text" placeholder = "talk something" onKeyUp = {this.getSMS}/>
          <div className = "send" onClick = {this.handleShake} >Shake</div>
          <div className = "pic" >Pic</div>
        </div>
      </div>
    )
  }
})
        var DialogFeed = React.createClass({
          getInitialState: function(){
            return ({
              newSms: []
            })
          },
          loadNewSms : function(){
            var that = this;
            socket.on("newSMS", function(data){
              // console.log(data);
              that.setState({
                newSms : that.state.newSms.concat(data)
              })
              console.log("that.state.newSms: ", that.state.newSms);
            })  
          },
          componentDidMount: function(){
            this.loadNewSms();
            var node = ReactDOM.findDOMNode(this);
            setInterval(function(){
              node.scrollTop = node.scrollHeight;
            }, 100)
            // node.style.backgroud ="red";
            console.log("node: ", node);
          },
          render: function() {
            var dd = this.state.newSms.map(function(sms){
              var date = Date.now().toString();
                console.log("from 157: ", sms);
               return( <Dalog src={sms.userPic} sms = {sms.sms}></Dalog> )
            });
            return (
              <div className="play-chat-feed">
                {dd}
              </div>
            );
          }
        });
        var Dalog = React.createClass({
          render: function() {
            return (
              <div className="dalog">
                  <div><img src={this.props.src} key = {this.props.key} /></div>
                  <div>{this.props.sms}</div>
                  <div>{this.props.time}</div>
              </div>
            );
          }
        });
ReactDOM.render(
  <Room />,
  document.getElementById('roomMain')
);
