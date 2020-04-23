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

let btn = document.querySelector('.load');

btn.addEventListener('click', () => {
    fetch('http://localhost:5000/file') 
        .then(res => res.blob())
        .then(res => {
            // let img = document.createElement('img');
            // let outside = URL.createObjectURL(res)
            // let div = document.querySelector('div');
            // console.log(outside)

            // img.setAttribute('src', img);
            // div.appendChild(img)
            var reader = new FileReader();
            reader.readAsDataURL(res); 
            reader.onloadend = function() {
                var base64data = reader.result;                
                console.log(base64data);
                let div = document.querySelector('div');
                let img = document.createElement('img');

                img.setAttribute('src', base64data);
                div.appendChild(img)
            }
        })
})

