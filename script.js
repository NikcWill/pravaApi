let container = document.querySelector('#resultados');
let formulario = document.querySelector('.formulario');
let filmeInput = document.querySelector('#filmeInput');
let proximoButton = document.querySelector('#proximo');
let paginaAtual = 1;

async function getApi(filme, page) {
    let request = await fetch(`https://www.omdbapi.com/?s=${filme}&apikey=e6c43dc6&page=${page}`);
    let data = await request.json();

    console.log(data['Search']);

    container.innerHTML = '';

    data.Search.forEach((filme) => {
        console.log(filme.Title);
        container.innerHTML += `
        <img src='${filme.Poster}' alt="Poster do Filme">
        <h1>${filme.Title}</h1>`;
    });

    
    paginaAtual = page;

    if (data.Search.length > 0) {
        proximoButton.style.display = 'block';
    } else {
        proximoButton.style.display = 'none';
    }
}

formulario.addEventListener('submit', function (e) {
    e.preventDefault();
    getApi(filmeInput.value, 1); 
});

proximoButton.addEventListener('click', function (e) {
    e.preventDefault();
    getApi(filmeInput.value, paginaAtual + 1); 
});
