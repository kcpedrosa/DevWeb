
class Despesa {
	constructor(ano, mes, dia, tipo, descricao, valor){
		this.ano = ano
		this.mes = mes
		this.dia = dia
		this.tipo = tipo
		this.descricao = descricao
		this.valor = valor
	}
	validarDados(){
		for(let i in this){
			if(this[i] == undefined || this[i] == '' || this[i] == null){
				return false
				}
			}
			return true
		} 
	}


class Bd {
	constructor(){
		let id = localStorage.getItem('id')
		if(id === null){
			localStorage.setItem('id',0)
		}
	}

	getProximoId(){
		let proximoId = localStorage.getItem('id')
		return parseInt(proximoId) + 1

	}

	gravar(d){
	let idAtualizado = this.getProximoId()
	localStorage.setItem(idAtualizado, JSON.stringify(d))
	
	localStorage.setItem('id',idAtualizado)
	//seta o id como o valor do id atualizado
	}

	recuperarTodosRegistros() {
		//array que contem as despesas
		let arrayDespesas = Array()

		let id = localStorage.getItem('id')
		//laço para recuperar todas as despesas cadastradas em localstorage
		for(let i = 1; i <= id; i++){

			//recuperar a despesa
			let despesa = JSON.parse(localStorage.getItem(i))

			//pulando indices vazios[null]
			if(despesa === null){
				continue
			}

			arrayDespesas.push(despesa)
		}
		
		return arrayDespesas
	}
	pesquisar(despesa){
		let despesasFiltradas = Array()
		despesasFiltradas = this.recuperarTodosRegistros()


		console.log(despesa)
		console.log(despesasFiltradas)

		//ano [o if faz com que se o campo ano nao for selecionado, n haja verificação]
		if(despesa.ano != ''){
			console.log('filtro de ano')
			despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
			//abaixo apenas pra ver o retorno no console
			console.log(despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano))
		}

		if(despesa.mes != ''){
			console.log('filtro de mes')
			despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
		}

		if(despesa.dia != ''){
			console.log('filtro de dia')
			despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
		}

		if(despesa.tipo != ''){
			console.log('filtro de tipo')
			despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
		}

		if(despesa.descricao != ''){
			console.log('filtro de descricao')
			despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
		}

		if(despesa.valor != ''){
			console.log('filtro de valor')
			despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
		}

		return despesasFiltradas

		}
	}


let bd = new Bd(
	)

function cadastrarDespesa(){
	let ano = document.getElementById('ano')
	let mes = document.getElementById('mes')
	let dia = document.getElementById('dia')
	let tipo = document.getElementById('tipo')
	let descricao = document.getElementById('descricao')
	let valor = document.getElementById('valor')

	let despesa = new Despesa (
		ano.value,
		mes.value,
		dia.value,
		tipo.value,
		descricao.value,
		valor.value		
		)

	if (despesa.validarDados() == true ){
		bd.gravar(despesa)
		//dialog de sucesso
		document.getElementById('modal_titulo').innerHTML = 'Despesa salva com sucesso'
		document.getElementById('modal_titulo_div').className = 'modal-header text-success'
		document.getElementById('modal_conteudo').innerHTML = 'Despesa foi cadastrada com sucesso'
		document.getElementById('modal_btn').innerHTML = 'Voltar'
		document.getElementById('modal_btn').className = 'btn btn-success'

		//jQuery abaixo
		$('#modalRegistraDespesa').modal('show')
		console.log('Dados válidos')
		ano.value = ''
		mes.value = ''
		dia.value = ''
		tipo.value = ''
		descricao.value = ''
		valor.value = ''

	} else {
		//dialog de erro
		document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão da despesa'
		document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
		document.getElementById('modal_conteudo').innerHTML = 'Erro no cadastramento da despesa'
		document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir'
		document.getElementById('modal_btn').className = 'btn btn-danger'

		$('#modalRegistraDespesa').modal('show')
		console.log('Dados inválidos')
		
	}
}


function carregaListaDespesas() {
	let outroArrayDespesas = Array()

	outroArrayDespesas = bd.recuperarTodosRegistros()

	console.log(outroArrayDespesas)

	//selecionando o elemento html tbody pelo id
	let listaDespesas = document.getElementById('listaDespesas')

	//vamos percorrer o array outroArrayDespesas listando seu conteudo
	outroArrayDespesas.forEach( function(d){
		//console.log(d)

		//criando a linha <tr>
		let linhatr = listaDespesas.insertRow()

		//criando as colunas
		linhatr.insertCell(0).innerHTML = `${d.dia}/ ${d.mes}/ ${d.ano}`
		
		//ajustar o tipo, substt o numero pela descricao do tipo
		switch(d.tipo){
			case '1':d.tipo = 'Alimentação'
				break
			case '2':d.tipo = 'Educação'
				break
			case '3':d.tipo = 'Lazer'
				break
			case '4':d.tipo = 'Saúde'
				break
			case '5':d.tipo = 'Transporte'
				break
		}
		linhatr.insertCell(1).innerHTML = d.tipo

		linhatr.insertCell(2).innerHTML = d.descricao
		linhatr.insertCell(3).innerHTML = d.valor

	})
}

function pesquisarDespesa() {
	let ano = document.getElementById('ano').value
	let mes = document.getElementById('mes').value
	let dia = document.getElementById('dia').value
	let tipo = document.getElementById('tipo').value
	let descricao = document.getElementById('descricao').value
	let valor = document.getElementById('valor').value

	let despesaPesquisada = new Despesa(ano, mes, dia, tipo, descricao, valor)

	console.log(despesaPesquisada)
	//let retornoDespesasConsultadas = Array()
	//descobri que é desnec isso, se descomtr tire o let abaixo
 

	let retornoDespesasConsultadas = bd.pesquisar(despesaPesquisada)


	//selecionando o elemento html tbody pelo id
	let listaDespesas = document.getElementById('listaDespesas')
	listaDespesas.innerHTML = ''

	//vamos percorrer o  retornoDespesasConsultadas listando seu conteudo
	retornoDespesasConsultadas.forEach( function(d){
		//console.log(d)

		//criando a linha <tr>
		let linhatr = listaDespesas.insertRow()

		//criando as colunas
		linhatr.insertCell(0).innerHTML = `${d.dia}/ ${d.mes}/ ${d.ano}`
		
		//ajustar o tipo, substt o numero pela descricao do tipo
		switch(d.tipo){
			case '1':d.tipo = 'Alimentação'
				break
			case '2':d.tipo = 'Educação'
				break
			case '3':d.tipo = 'Lazer'
				break
			case '4':d.tipo = 'Saúde'
				break
			case '5':d.tipo = 'Transporte'
				break
		}
		linhatr.insertCell(1).innerHTML = d.tipo

		linhatr.insertCell(2).innerHTML = d.descricao
		linhatr.insertCell(3).innerHTML = d.valor

	})

}
