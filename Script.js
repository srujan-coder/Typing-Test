'use strict'
let main = document.getElementById('main')
let textContainer = document.getElementById('text-container')
let resultsContainer = document.getElementById('Results')
let speedText = document.getElementById('speed')
let accuracyText = document.getElementById('accuracy')
let timeText = document.getElementById('time')
let Correction = document.getElementById("Correction")



const invalidKeys = 'F1 F2 F3 F4 F5 F6 F7 F8 F9 F10 F11 F12 Escape Tab CapsLock Shift Control Alt Meta ArrowLeft ArrowRight ArrowDown ArrowUp Enter'.split(' ');
const text = "The world's oldest wooden wheel has been around for more than 5,000 years. It was found in 2002, approximately 12 miles south of Ljubljana, the capital of Slovenia, and is now housed in the city's museum. Radiocarbon dating was used to determine the wheel's age, which is somewhere between 5,100 and 5,350 years old. Closer to home, these are the oldest tourist attractions in every state."
const textArr = text.split('')
const htmlArr = textArr.map((item,index,array) =>{
    if (item === ' ') {
        return `<span class="space" id="span${index}">${item}</span>`
    }
    return `<span class="char" id="span${index}">${item}</span>`
});
textContainer.innerHTML= htmlArr.join('')

let errors= []
let firstKey = true
let currentPos = 0
let currentTime = 0
let backspaceNeeded = false
let repeat
document.addEventListener('keydown', event=>{
    if (event.key===' '){
        event.preventDefault()
    }
    if (firstKey){
        firstKey = false
        repeat = setInterval(() => currentTime++, 1000)
    }
    if (event.location === 0 && invalidKeys.includes(event.key) == false){
        handleKey(event.key)
    }
})

function handleKey(key){
    let span = document.getElementById(`span${currentPos}`).style
    if (backspaceNeeded == false){
        if(key == textArr[currentPos]){
            span.color="green"
            currentPos++
        }else{
            if (textArr[currentPos] === ' ') {
                span.backgroundColor = 'red';
            } else {
                span.color = "red"
                Correction.style.visibility = "visible"
            }
            backspaceNeeded = true
            errors.push(textArr[currentPos])
        }
    }else{
        if (event.key==="Backspace"){
            if(textArr[currentPos]==" "){
                span.backgroundColor="transparent"
            }else{
                span.color="black"
            }
            backspaceNeeded = false
            Correction.style.visibility = "hidden"
        }
    }
    if (currentPos== textArr.length){
        clearInterval(repeat)
        handleEnd()
    }
}

let button = document.getElementById("button")
function handleEnd(){
    console.log(currentTime)
    let wpm = Math.floor(textArr.length/5/(currentTime/60))
    let accuracy = Math.round(((textArr.length - errors.length) / textArr.length) * 10000)/100
    let min = Math.floor(currentTime/60)
    let sec = currentTime - min*60
    accuracyText.innerHTML = `${accuracy} %`
    speedText.innerHTML =`${wpm} wpm`
    timeText.innerHTML= `${min} min ${sec} sec`
    button.onclick = () => resultsContainer.style.visibility = "visible"
}