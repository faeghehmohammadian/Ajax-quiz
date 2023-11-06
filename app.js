
let cur=0;
const mainBox=document.querySelector(".mainbox")
const startButton=document.querySelector(".startButton")
const output=document.querySelector(".output")
const score=document.querySelector(".score")
const holder=[];
const quesitons=[];
let sco=0;

window.addEventListener('DOMContentLoaded', ()=>{
    loadQuestions();
})
startButton.addEventListener('click',(event)=>{
    newQuestion();
    startButton.style.display='none';
})
function newQuestion(){
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
    output.innerHTML=`Your Score: ${sco} / ${quesitons.length}`
    score.innerHTML=''
    startButton.textContent='Try Again'
    startButton.addEventListener('click',function(){location.reload()})
}
function selOption(e){
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
    startButton.style.display='block';
    
    cur++ ;
    if(cur>=quesitons.length){
        startButton.textContent='See Score';
        startButton.addEventListener('click',showscore)

    }else{
        startButton.textContent='Next';
    }
}


function loadQuestions(){
    const response=fetch("http://localhost:3000/download")
    .then(res => res.json())
    .then((data)=>{
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
            let mainObj={
                "question": el.question,
                "options": answers
            }
            quesitons.push(mainObj)
            //console.log(quesitons)
        });
    })
}