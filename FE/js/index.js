const form = document.querySelector('.form');
const logout = document.querySelector('.logout');

form.addEventListener('submit', event => {
   event.preventDefault();
   const { user, password } = event.target.elements;
   fetch(`http://localhost:3000/login`, {
      method: 'post',
      body: JSON.stringify({ id: user.value, password: password.value }),
      headers: {
         'Content-Type': 'application/json'
      }
   })
      .then(data => data.json())
      .then(data => {
         console.log('login ok');
         console.log(data);
         sessionStorage.setItem('user', data);
      });
});

logout.addEventListener('click', event => {
   event.preventDefault();
   fetch('http://localhost:3000/logout').then(() => alert('Log out'));
});
