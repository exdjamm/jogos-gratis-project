let content = document.querySelector('#content');
var last='Categorias';

function createElement({tag, id, classe}) {
	new_element =  document.createElement(tag)
	if (id != undefined) {
		new_element.id = id	
	}
	if (classe != undefined) {
		new_element.className = classe	
	}
	

	return new_element
}

function createGameCategory(gameCategory) {
	div = createElement({tag:'div', id:'game-category'})
	h2 = createElement({tag:'h2'})

	h2.innerText = gameCategory
	div.appendChild(h2)

	return div
}

function createGameIndice(games) {
	section = createElement({tag:'section', id:'game-indice'})

	games.forEach(game => {
		gameinfo = createInfoGame(game)
		section.appendChild(gameinfo)
	})

	return section
}

function createInfoGame(game) {
	infoGameDiv = createElement({tag:'div', classe:'info-game clickable'})

	
	gameimg = createGameImg({imgSrc:game.imgSrc, plataform:game.plataform})
	subinfo = createSubInfo({name:game.name, tags:game.tags})
	
	infoGameDiv.appendChild(gameimg)
	infoGameDiv.appendChild(subinfo)

	return infoGameDiv
}

function createGameImg({imgSrc, plataform}) {
	gameimgDiv = createElement({tag:'div', id:'game-img'})
	marcaaguaDiv = createElement({tag:'div', classe:'marca-dagua'})
	imgGame = createElement({tag:'img', classe:'game-img'})

	imgGame.src = imgSrc

	marcaaguaDiv.appendChild(createElement({tag:'img', classe:plataform+'-logo'}))
	gameimgDiv.appendChild(marcaaguaDiv)
	
	gameimgDiv.appendChild(imgGame)

	return gameimgDiv
}

function createSubInfo({name, tags}) {
	subinfoDiv = createElement({tag:'div', id:'sub-info'})
	tagsDiv = createElement({tag:'div', id:'tags'})
	titleSpan = createElement({tag:'span', classe:'title-game'})

	tags.forEach(tag => {
		span = createElement({tag:'span', classe:'tag'})
		span.innerText = tag
		tagsDiv.appendChild(span)
	})

	titleSpan.innerText = name
	subinfoDiv.appendChild(titleSpan)
	subinfoDiv.appendChild(tagsDiv)

	return subinfoDiv
}

function criarContentHeader(){
	divPlataforma=createElement({tag:'div', id:'content-header'})
	nomePlataforma=createElement({tag:"h2", id:"superMario"})
	content.appendChild(divPlataforma)
	divPlataforma.appendChild(nomePlataforma)
}



function loadClick(plataformaSelecionada){
	content.innerHTML = ""; 
	criarContentHeader();

	if(plataformaSelecionada=='Categorias'){
		document.getElementById("superMario").innerHTML = plataformaSelecionada;
		loadGames()
	}else {
		document.getElementById("superMario").innerHTML = "Grátis na "+ plataformaSelecionada;
	}
	last = plataformaSelecionada;
	//loadGames()
}

function loadOver(plataformaSelecionada){

	if(plataformaSelecionada!=last){
		content.innerHTML = ""; 
		criarContentHeader();

		if(plataformaSelecionada=='Categorias'){
			document.getElementById("superMario").innerHTML = plataformaSelecionada;
			loadGames()
		}else {
			document.getElementById("superMario").innerHTML = "Grátis na "+ plataformaSelecionada;
		}
	}
	
}

function loadOut(plataformaSelecionada){
	
		loadClick(last);
}



function loadGames(){
    var request = new XMLHttpRequest();
    request.open('GET', './data-games/data-games.json')
    request.responseType = 'json'

    criarContentHeader();
	document.getElementById("superMario").innerHTML = 'Categorias';

    request.onload = function(){
    	allGames = request.response

    	allGames.forEach(gameCategory => {
    		gameCat = createGameCategory(gameCategory.gameCategory)
    		section = createGameIndice(gameCategory.games)

    		content.appendChild(gameCat)
    		content.appendChild(section)

    		document.querySelectorAll('.steam-logo').forEach(img => {img.src = 'https://cdn3.iconfinder.com/data/icons/social-media-2169/24/social_media_social_media_logo_steam-512.png'})

			document.querySelectorAll('.epic-logo').forEach(img => {img.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Epic_Games_logo.svg/882px-Epic_Games_logo.svg.png'})

			document.querySelectorAll('.uplay-logo').forEach(img => {img.src = 'https://png2.cleanpng.com/sh/2ad90d7c18ea890289d2315c8b2f6b1f/L0KzQYm3VMA0N6NBfZH0aYP2gLBuTfNwdaF6jNd7LXnmf7B6TgVxdJJARdV1aYCwccP7Tflkd146edU8M0G2cYS3UfQ1Ol88S6Y8NEezRIK8UsI4PGI6TqQ6OUe0PsH1h5==/kisspng-computer-icons-uplay-clip-art-ico-5ac3313a301d42.7343470415227415621971.png'})

			document.querySelectorAll('.gog-logo').forEach(img => {img.src = 'https://upload.wikimedia.org/wikipedia/commons/d/de/GOG.com_Logo.png'})

			document.querySelectorAll('.itch-logo').forEach(img => {img.src = 'https://pbs.twimg.com/profile_images/1212846124945428480/w1htiJ0v_400x400.png'})
    	})

    }

    request.send()
}

loadGames()
