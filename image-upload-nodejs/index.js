let form = document.querySelector('form')
console.log(form)

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let data = new FormData(form);
    console.log(data.get('photo'))

    let file = data.get('photo');
    data.append('file', 'kkk')
    
    fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: data
    }) 
        .then(res => res.json())
        .then(res => {
            let msg = document.querySelector('.msg');
            msg.innerHTML = res.text;
        })
})