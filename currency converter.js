const BASE_URL = "https://v6.exchangerate-api.com/v6/6106c9004c8cd633c0d6d2c0/pair/"



let dropdown = document.querySelectorAll("select")
let img = document.querySelectorAll(".option img")
let btn = document.querySelector(".btn")
let fromCurr = document.querySelector(".from select")
let toCurr = document.querySelector(".to select")




async function upDateExchangeRate(){
   
   let amount = document.querySelector("form input")
   let result = document.querySelector(".final-amount")
   let currFrom = fromCurr.value
   let currTo = toCurr.value
   let finalAmount = amount.value

   if(finalAmount < 1 || finalAmount === ""){
      finalAmount = 1
      amount.value = "1"
   }

   let URL = `${BASE_URL}${currFrom}/${currTo}/${finalAmount}`
   let response = await fetch(URL);
   let data = await response.json();

   result.innerText = `${finalAmount} ${currFrom} = ${data.conversion_result} ${currTo}`

}



window.addEventListener("load", ()=>{
   upDateExchangeRate();
})


for(let select of dropdown){
   for(code in codeList){
   let newOption = document.createElement("option")
   newOption.innerText = code
   newOption.value = code

   if(select.id === "to" && code === "INR"){
      newOption.selected = "selected"
   }
   else if(select.id === "from" && code === "USD"){
      newOption.selected = "selected"
   }
   select.append(newOption)
   }
   

   select.addEventListener("change", (evt)=>{
      updateFlag(evt.target);
   })

}


const updateFlag = (element) => {
   let currValue = element.value
   let currFlag = codeList[currValue]
   let currSrc = `https://flagsapi.com/${currFlag}/flat/64.png`
   let img = element.parentElement.querySelector("img")
   img.src = currSrc
}



btn.addEventListener("click", (evt)=>{
   evt.preventDefault();
   upDateExchangeRate();

})



