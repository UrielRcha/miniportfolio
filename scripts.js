function mostrarProjeto(idProjeto) {
    var projetos = document.querySelectorAll('.projeto');
    projetos.forEach(function(projeto) {
        projeto.style.display = 'none';
    });

    var projetoSelecionado = document.getElementById(idProjeto);
    projetoSelecionado.style.display = 'block';

    if (idProjeto === 'projeto1') {
        carregarReceitas();
    }
}

function carregarReceitas() {
    document.getElementById('receitas').innerHTML = '';

    const idioma = document.getElementById('idioma').value;


    fetch(`https://www.themealdb.com/api/json/v1/1/random.php?language=${idioma}`)
        .then(response => response.json())
        .then(data => {
            const receita = data.meals[0];
            const receitaHTML = `
                <div>
                    <h3>${receita.strMeal}</h3>
                    <img src="${receita.strMealThumb}" alt="${receita.strMeal}">
                    <p>${receita.strInstructions}</p>
                </div>
            `;
            document.getElementById('receitas').innerHTML = receitaHTML;
        })
        .catch(error => {
            console.error('Erro ao carregar receitas:', error);
            document.getElementById('receitas').innerHTML = '<p>Erro ao carregar receitas. Por favor, tente novamente mais tarde.</p>';
        });
}

function pesquisarReceita() {
    const termoPesquisa = document.getElementById('pesquisa').value;

    document.getElementById('receitas').innerHTML = '';

    const idioma = document.getElementById('idioma').value;


    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${termoPesquisa}&language=${idioma}`)
        .then(response => response.json())
        .then(data => {
            if (data.meals) {
                data.meals.forEach(receita => {
                    const receitaHTML = `
                        <div>
                            <h3>${receita.strMeal}</h3>
                            <img src="${receita.strMealThumb}" alt="${receita.strMeal}">
                            <p>${receita.strInstructions}</p>
                        </div>
                    `;
                    document.getElementById('receitas').innerHTML += receitaHTML;
                });
            } else {
                document.getElementById('receitas').innerHTML = '<p>Nenhuma receita encontrada.</p>';
            }
        })
        .catch(error => {
            console.error('Erro ao pesquisar receitas:', error);
            document.getElementById('receitas').innerHTML = '<p>Erro ao pesquisar receitas. Por favor, tente novamente mais tarde.</p>';
        });
}

function buscarMusicas() {
    const nomeArtista = document.getElementById('artista').value.trim();
    if (nomeArtista === '') {
        alert('Por favor, digite o nome de um artista.');
        return;
    }

    const apiKey = 'ainda vou por a chave api';
    const url = `http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${encodeURIComponent(nomeArtista)}&api_key=${apiKey}&format=json&limit=5`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const musicas = data.toptracks.track;
            if (musicas && musicas.length > 0) {
                const musicasHTML = musicas.map(musica => `
                    <div>
                        <h3>${musica.name}</h3>
                        <p>${musica.artist.name}</p>
                    </div>
                `).join('');
                document.getElementById('musicas').innerHTML = musicasHTML;
            } else {
                document.getElementById('musicas').innerHTML = '<p>Nenhuma música encontrada para este artista.</p>';
            }
        })
        .catch(error => {
            console.error('Erro ao buscar músicas:', error);
            document.getElementById('musicas').innerHTML = '<p>Erro ao buscar músicas. Por favor, tente novamente mais tarde.</p>';
        });
}

const habitInput = document.getElementById('habit-input');
const habitList = document.getElementById('habit-list');

function adicionarHabito() {
    const habitText = habitInput.value.trim();
    if (habitText === '') {
        alert('Por favor, digite um hábito.');
        return;
    }

    const habitItem = document.createElement('li');
    habitItem.innerHTML = `
        ${habitText}
        <button onclick="fazerCheckIn(this)">Check-in</button>
    `;
    habitList.appendChild(habitItem);
    habitInput.value = '';
}

function fazerCheckIn(button) {
    const habitItem = button.parentNode;
    habitItem.classList.toggle('checked');
}


function enviarMensagem() {
    var userInput = document.getElementById('user-input').value;
    var userMessage = document.createElement('div');
    userMessage.classList.add('chat-message');
    userMessage.classList.add('user-message');
    userMessage.innerHTML = `<p>${userInput}</p>`;
    document.querySelector('.chat-container').appendChild(userMessage);
    document.getElementById('user-input').value = '';

    fetchMessage(userInput);
}

function fetchMessage(userInput) {

    var apiKey = 'ainda vou por a chave API OPENAI';
    var apiUrl = 'https://api.openai.com/v1/completions';

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + apiKey
        },
        body: JSON.stringify({
            model: 'text-davinci-002', // Modelo GPT-3.5
            prompt: userInput,
            max_tokens: 50
        })
    })
    .then(response => response.json())
    .then(data => {
        var botMessage = document.createElement('div');
        botMessage.classList.add('chat-message');
        botMessage.classList.add('bot-message');
        botMessage.innerHTML = `<p>${data.choices[0].text}</p>`;
        document.querySelector('.chat-container').appendChild(botMessage);
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}
