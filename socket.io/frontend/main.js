let lscore=document.getElementById('live-score')
let lwicktes=document.getElementById('wicket')
let lovers=document.getElementById('lovers')
let county=document.getElementById('show-con')
const socket=io("http://localhost:9000", {transports: ["WebSocket"]})

socket.on("showmore", (show) =>{

    let runs=show.runs
    let wicket=show.wickets
    let overs=show.overs
    let con1=show.con1
    let con2=show.con2
    showscore(runs,wicket,overs,con1,con2)
})

function showscore(runs,wickets,overs,con1,con2){
    county.innerHTML=`match between ${con1} vs ${con2}`
    lscore.innerText=`total: ${runs}`
    lwicktes.innerText=`total wickets ${wickets}`
    lovers.innerText=`total over ${overs}`
}

let morebut=document.getElementById('moreinfo')