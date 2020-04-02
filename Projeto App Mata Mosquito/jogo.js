
var altura = 0
var largura = 0
var vidas = 1
var tempo = 10

var criaMosquitoTempo = 1500

var nivel = window.location.search
nivel = nivel.replace('?','')

if(nivel === 'normal') {
	criaMosquitoTempo = 1500

} else if(nivel === 'dificil') {
	criaMosquitoTempo = 1000

} else if(nivel === 'chucknorris') {
	criaMosquitoTempo = 750

}


function ajustaTamanho() {
	 altura = window.innerHeight
	 largura = window.innerWidth

	console.log(largura, altura)

}

ajustaTamanho()

var cronometro = setInterval(function() {

	tempo -= 1

	if (tempo < 0) {
		clearInterval(cronometro)
		clearInterval(criaMosquito)
		window.location.href = 'vitoria.html'
	} else {
	document.getElementById('cronometro').innerHTML = tempo
	}
}, 1000)

function posicaoRandomica() {
	//remover o mosquito anterir [caso exista]
	if (document.getElementById('moskito')) {
	document.getElementById('moskito').remove()

	console.log('elemento selecionado foi: v ' + vidas)
	if(vidas > 3) {
		window.location.href='fimdejogo.html'

	} else {
	document.getElementById('v' + vidas).src="imagens/coracao_vazio.png"
	vidas = vidas + 1

	}
}

var posicaoX = Math.floor(Math.random() * largura) - 90
var posicaoY = Math.floor(Math.random() * altura) - 90

console.log(posicaoX, posicaoY)

posicaoX = posicaoX < 0 ? 0 : posicaoX
posicaoY = posicaoY < 0 ? 0 : posicaoY

//criar  o elemento html
var mosquito = document.createElement('img')
mosquito.src = 'imagens/mosquito.png'
mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
mosquito.style.left = posicaoX + 'px'
mosquito.style.top = posicaoY + 'px'
mosquito.style.position = 'absolute'
mosquito.id = 'moskito'
mosquito.onclick = function() {
	this.remove()
}


document.body.appendChild(mosquito)

console.log(tamanhoAleatorio())

console.log(ladoAleatorio())



}

function tamanhoAleatorio() {
	var classe = Math.floor(Math.random() * 3)
	
	switch(classe) {
		case 0:
			return 'mosquito1'

		case 1:
			return 'mosquito2'

		case 2:
			return 'mosquito3'

	}
}

function ladoAleatorio() {
	var classe = Math.floor(Math.random() * 2)
	
	switch(classe) {
		case 0:
			return 'ladoA'

		case 1:
			return 'ladoB'

	}
}