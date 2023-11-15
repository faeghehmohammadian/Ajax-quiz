const mainBox=document.querySelector(".mainbox")
const startButton=document.querySelector(".startButton")
const nextButton=document.querySelector(".nextButton")
const output=document.querySelector(".output")
const score=document.querySelector(".score")
let cur=0;
const holder=[];
const quesitons=[];
let sco=0;

window.addEventListener('DOMContentLoaded', ()=>{
    loadQuestions();
    nextButton.style.display='none';
})
startButton.addEventListener('click',(event)=>{
    newQuestion();
    startButton.style.display='none';
})
nextButton.addEventListener('click',(event)=>{
    newQuestion();
})
function newQuestion(){
    nextButton.style.visibility= "hidden";
    score.innerHTML=`${cur+1} / ${quesitons.length}`
    const el=quesitons[cur]
    el.options.sort(()=>{return 0.5 - Math.random()})
    output.innerHTML='';
    const que1= document.createElement('div');
    const ans1= document.createElement('div');
    que1.textContent= el.question;
    que1.classList.add('question');
    holder.length=0;
    el.options.forEach((ans)=>{
        const div=document.createElement('div');
        holder.push(div);
        div.textContent=ans.response;
        div.classList.add('options')
        div.correct=ans.correcr;
        div.addEventListener('click',selOption)
        ans1.append(div);
    })
    output.append(que1);
    output.append(ans1);
}
function showscore(){
    nextButton.style.visibility= "visible";
    output.innerHTML=`Your Score: ${sco} / ${quesitons.length}`;
    score.innerHTML='';
    nextButton.textContent='Try Again';
    nextButton.addEventListener('click',function(){location.reload()});
}
function selOption(e){
    nextButton.style.visibility= "visible";
    endTurn();
    if(e.target.correct){
        e.target.style.backgroundColor= '#90ee90';
        sco++;
    }
    else{
        e.target.style.backgroundColor= '#f08080'
    }
    e.target.style.color='rgb(61, 66, 61)';
}
function endTurn(){
    holder.forEach((el)=>{
        el.removeEventListener('click',selOption);
        el.style.backgroundColor='rgb(116, 121, 116)'
    })
    nextButton.style.display='block';
    cur++ ;
    if(cur>=quesitons.length){
        nextButton.textContent='See Score';
        nextButton.addEventListener('click',showscore)
    }else{
        nextButton.textContent='Next';
    }
}
function loadQuestions(){
    const response=fetch("http://localhost:3000/download")
    .then(res => res.json())
    .then((data)=>{
        //console.log(data)
        data.forEach((el) => {
            let answers=[];
            el.answers.forEach((ans)=>{
                let tempObj={
                    "response": ans,
                    "correcr": false
                }
                answers.push(tempObj)
            })
            let tempObj={
                "response":el.correct,
                "correcr": true
            }
            answers.push(tempObj)
            //console.log(answers);
            let mainObj={
                "question": el.question,
                "options": answers
            }
            quesitons.push(mainObj)
            
        });
        console.log(quesitons)
    })
}