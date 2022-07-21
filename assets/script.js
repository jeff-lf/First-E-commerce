function adicionarProduto(arrProdutos){
    const list = document.querySelector('.produtos');
    list.innerHTML = ''

    for(let i = 0; i < arrProdutos.length; i++){
        const li = document.createElement('li')
        li.classList.add('card')

        const foto = document.createElement('div')
        foto.classList.add('foto')

        const img = document.createElement('img')
        img.src = arrProdutos[i].img

        const descricao = document.createElement('div')
        descricao.classList.add('descricao')

        const tag = document.createElement('span')
        tag.classList.add('tipo')
        tag.innerText = arrProdutos[i].tag

        const h2 = document.createElement('h2')
        h2.innerText = arrProdutos[i].titulo

        const p = document.createElement('p')
        p.innerText = arrProdutos[i].descricao

        const preco = document.createElement('span')
        preco.classList.add('valor')
        preco.innerText = arrProdutos[i].valor

        const button = document.createElement('button')
        button.classList.add('addCarrinho')
        button.innerText = arrProdutos[i].botao


        li.appendChild(foto)
        foto.appendChild(img)
        li.appendChild(descricao)
        descricao.appendChild(tag)
        descricao.appendChild(h2)
        descricao.appendChild(p)
        descricao.appendChild(preco)
        descricao.appendChild(button)

        list.appendChild(li)

    }


}
adicionarProduto(dataProdutos)


function filterProducts(event){
    const newDataProdutos = []
    const typeProduct = event.target
    const arrayTypeProducts = document.querySelectorAll('.buttonMenu')
    const main = document.querySelector('main')
    
    if(typeProduct.dataset.tag === 'Todos'){
        adicionarProduto(dataProdutos)
    }else{ 
        for(let i=0; i<dataProdutos.length; i++){
            if(typeProduct.dataset.tag === dataProdutos[i].tag){
            newDataProdutos.push(dataProdutos[i])
            }
         }
        adicionarProduto(newDataProdutos)
        
    }
    for(let i=0; i<arrayTypeProducts.length; i++){
        arrayTypeProducts[i].classList.remove('active')
    }
    typeProduct.classList.add('active')
}

//Listener do Menu para filtrar produtos
const listTypeProduct = document.getElementById('listNav')
listTypeProduct.addEventListener('click', filterProducts)


function addProdutosNoCarrinho(arrProdutos){
    const itensCarrinho = document.querySelector('.itensCarrinho');
    for(let i=0; i<arrProdutos.length; i++){
        const li = document.createElement('li')
        li.classList.add('cardCarrinho')

        const img = document.createElement('img')
        img.classList.add('removerImg')
        img.src = arrProdutos[i].img

        const div = document.createElement('div')
        div.classList.add('descricaoCarrinho')

        const h2 = document.createElement('h2')
        h2.innerText = arrProdutos[i].titulo

        const span = document.createElement('span')
        span.innerText = arrProdutos[i].valor

        const button = document.createElement('button')
        button.classList.add('removerButton')
        button.innerText = 'Remover produto'

        li.appendChild(img)
        div.appendChild(h2)
        div.appendChild(span)
        div.appendChild(button)
        li.appendChild(div)

        itensCarrinho.appendChild(li)
    }

    //Remover Itens do Carrinho

    let remover = document.querySelectorAll('.removerButton')
    for(let i = 0; i <remover.length; i++){
    remover[i].addEventListener('click', function (){
    let elemento = remover[i].parentElement.parentElement
    let img = document.getElementsByClassName('.removerImagem')
    elemento.remove(img)
    addDadosCarrinho()
})
}
    addDadosCarrinho()
}


function filterAddProdutosCarrinho(event){
    const arrAddProdutos = []
    const product = event.target

    if(product.classList.value === 'addCarrinho'){
        let pai = product.parentElement.parentElement
        let elemento = {
            img: pai.querySelector('img').src,
            titulo: pai.querySelector('h2').innerText,
            valor: pai.querySelector('span.valor').innerText
        }
        arrAddProdutos.push(elemento)
    }
    addProdutosNoCarrinho(arrAddProdutos) 
}

const listProdutos = document.getElementById('produtosVitrini')
listProdutos.addEventListener('click', filterAddProdutosCarrinho)

//Pesquisar Produtos
let pesquisar = document.querySelector('.pesquisaButton')
pesquisar.addEventListener('click', function () {
    let input = document.querySelector('.pesquisaInput')
    let arrPesquisado = []
    for(let i = 0; i < dataProdutos.length; i++){
        if(dataProdutos[i].titulo.toLowerCase().includes(input.value.toLowerCase())){
            arrPesquisado.push(dataProdutos[i])
        }
    }
    adicionarProduto(arrPesquisado)
})


//Adicionar quantidade e total dos produtos no carrinho
let numero = document.createElement('span')
numero.classList.add('spanQuantidade')
let span = document.createElement('span')
span.classList.add('spanValor')
function addDadosCarrinho(){
    let itensCarrinho = document.querySelectorAll('.cardCarrinho')
    let quantidade = document.getElementById('quantidade') 
    let valor = document.getElementById('valor')   
    numero.innerText = 0
    for(let i = 0; i < itensCarrinho.length; i++){
        numero.innerHTML = ''
        let n = itensCarrinho.length
        numero.innerText = n

    }
    quantidade.appendChild(numero)

    //Adicionar valor dos produtos
    let valores = []
    for(let i = 0; i < itensCarrinho.length; i++){
    let valor = 0
    valor = itensCarrinho[i].querySelector('span')
        valores.push(valor.textContent)
    }
    let soma = 0
    for(let i = 0; i < valores.length; i++){
        soma += parseInt(valores[i].slice(-6))
    }
    span.innerText = soma
    valor.appendChild(span)
}

