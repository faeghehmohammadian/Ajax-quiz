


window.addEventListener('DOMContentLoaded', ()=>{
    loadQuestions();
})
function loadQuestions(){
    const response=fetch("http://localhost:3000/download")
    .then(res => res.json())
    .then((data)=>{
        console.log(data)
    })
}