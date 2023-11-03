
const url="quiz.json";

window.addEventListener('DOMContentLoaded', ()=>{
    loadQuestions();
})
function loadQuestions(){
    fetch(url).than(req=>reportError.json())
    .then((data)=>{
        console.log(data)
    })
}