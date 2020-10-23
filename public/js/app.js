// import { response } from "express"

// import { response } from "express"

console.log('festching data')


// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data);
//     })
// })


fetch('/weather?address=!').then((response)=>{
    response.json().then((data)=>{
        console.log(data);
    })
})

const weatherForm = document.querySelector('form');

weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    console.log('testing!!')
})