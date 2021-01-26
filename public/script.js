// const input = document.querySelector('input[name="price"]');

// function handlKeydown(e) {
//   setTimeout(() => {
//     let { value } = e.target; // pega o valor digitado pelo usuario

//     value = value.replace(/\D/g, ''); // expressa regular só pega numeros


//     // formata o moeda para estilo da moeda local
//     value = new Intl.NumberFormat("pt-BR", { 
//       style: "currency",
//       currency: "BRL",
//     }).format(value/100);

//     e.target.value = value // seta o valor devolta 
//   }, 1);
// }

// input.addEventListener("keydown", handlKeydown);

const Mask = {
  apply(input, func) {
      setTimeout(function() {
          input.value = Mask[func] (input.value)
      }, 1)
  },
  formatBRL(value) {
      value = value.replace(/\D/g,"")
  
      return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
      }).format(value/100)
  },

}
