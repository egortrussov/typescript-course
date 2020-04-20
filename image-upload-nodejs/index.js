let form = document.querySelector('form')

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let input = document.querySelector('input[type="file"]');
    console.log(input.value)
})