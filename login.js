function showLoginModal() {
  
    var loginModal = document.getElementById('loginModal');
     loginModal.style.display = 'block';
   }
   
   function hideLoginModal() {
     var loginModal = document.getElementById('loginModal');
     loginModal.style.display = 'none';
   }
   function login(event) {
           event.preventDefault();
           var email = document.getElementById('email').value;
           var password = document.getElementById('password').value;
           if (email.trim() !== '' && password.trim() !== '') {
             alert('LOG IN SUCCESSFUL.');
           } else {
             alert('Please fill in all fields.');
           }
         }