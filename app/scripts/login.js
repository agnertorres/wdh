'use strict';

(function(){
  var loginBtn = document.getElementById('login-btn'),
      loginContent = document.getElementById('login');

  loginBtn.addEventListener('click', function(){

    var loginForm = document.getElementById('login-form');

    if(!isEmpty(loginForm.loginEmail.value) && !isEmpty(loginForm.loginPwd.value)){

      if(validateEmail(loginForm.loginEmail.value)){
        location.href = "wdh.html";
      } else{
        alert("Informe um e-mail válido.");
      }

    } else{
      alert("informe o campo e-mail e senha.");
    }
  });

  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
})();
