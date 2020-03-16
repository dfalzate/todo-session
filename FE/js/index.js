const form = document.querySelector('.form');
const logout = document.querySelector('.logout');

form.addEventListener('submit', event => {
   event.preventDefault();
   const { user, password } = event.target.elements;
   fetch(`http://localhost:3000/login/${user.value}?pass=${password.value}`)
      .then(data => data.json())
      .then(data => {
         console.log('login ok');
         console.log(data);
         // fetch('http://localhost:3000/toDo')
         //    .then(data => data.json())
         //    .then(data => {
         //       console.log(data);
         //    });
      });
});

logout.addEventListener('click', event => {
   fetch('http://localhost:3000/logout').then(() => alert('Log out'));
});
