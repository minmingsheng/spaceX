// ****************************************************************************
// *                                login page                                *
// ****************************************************************************
'use strict';
var LoginForm = React.createClass({
  render: function() {
    return (
      <div className="login-form">
        <h1>SPACE-XYZ</h1>
        <FacebookBtn />
        <TwiiterBtn />
        <p>Powered by SPACE-XYZ </p>
      </div>
    );
  }
});

var FacebookBtn = React.createClass({
  h: function(e){
    e.stopPropagation();
     var dots = document.querySelectorAll(".dot");
     for (var i = 0; i < dots.length; i++) {
       dots[i].style.display = 'none';
     };
  },
  o: function(e){
    e.stopPropagation();
     var dots = document.querySelectorAll(".dot");
     for (var i = 0; i < dots.length; i++) {
       dots[i].style.display = 'block';
     };
  },
  render: function(){
    return(
      <a href="/auth/facebook" onMouseEnter={this.h} onMouseLeave={this.o}><button className="facebookBtn">Facebook</button></a>
    )
  }
})

var TwiiterBtn = React.createClass({
  h: function(e){
    e.stopPropagation();
     var dots = document.querySelectorAll(".dot");
     console.log(dots);
     for (var i = 0; i < dots.length; i++) {
       dots[i].style.display = 'none';
     };
  },
  o: function(e){
    e.stopPropagation();
     var dots = document.querySelectorAll(".dot");
     console.log(dots);
     for (var i = 0; i < dots.length; i++) {
       dots[i].style.display = 'block';
     };
  },
  render: function(){
    return(
      <a href="/auth/twitter" onClick={this.h} onMouseEnter={this.h} onMouseLeave={this.o}><button className="twitterBtn">Twitter</button></a>
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


