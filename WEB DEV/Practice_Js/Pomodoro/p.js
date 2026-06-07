const timer = document.querySelector(".timer")
const title = document.querySelector(".title")
const pomoCountsDisplay = document.querySelector(".pomoCountsDisplay")

// btns
const startbtn = document.querySelector(".startbtn")
const pausebtn = document.querySelector(".pausebtn")
const resumebtn = document.querySelector(".resumebtn")
const resetbtn = document.querySelector(".resetbtn")

// variables 
const WORK_TIME = 0.10* 60 // time in seconds
const BREAK_TIME = 0.5 * 60  
let timerId = null
let oneRoundCompleted = false // One round = work time + break time
let totalCount = 0
let Pause = false;

// Function to updateTitle
const updateTitle = (msg) => {
    title.textContent = msg
}

// Function to Save pomodoro counts to local storage
const saveLocalCounts = () => {
    let counts = JSON.parse(localStorage.getItem("pomoCounts"))
    counts !== null ? counts++ : counts = 1
    localStorage.setItem("pomoCounts", JSON.stringify(counts))
}


// Function to countdown
const countDown = (time) => {
    return () => {
        const mins = Math.floor(time/60).toString().padStart(2, '0')
        const secs = Math.floor(time%60).toString().padStart(2, '0')

        timer.textContent = `${mins}:${secs}`;
        time--;
        if (time < 0) {
            stopTimer();
            if (!oneRoundCompleted) {
                timerId = starttimer(BREAK_TIME)
                oneRoundCompleted = true
                updateTitle("it's Break Time")
            }

            else {
                updateTitle("Completed 1 Round of Pomodoro Technique")
                setTimeout(() => updateTitle("start Timer Again!"), 2000)
                totalCount++;
                saveLocalCounts()
                showPomoCounts()

        }
    }
}
}

//Function to start timer
const starttimer = (startTime) => {
    if (timerId !== null) {
        stopTimer();
    }
    return setInterval(countDown(startTime), 1000);
}

// Function to stop Timer
const stopTimer = () => {
    clearInterval(timerId)
    timerId = null;
}

// Function to get timer in seconds
const getTimeInSeconds = (timeString)=>{
    const[minutes,seconds] = timeString.split(":")
    return parseInt(minutes * 60) + parseInt(seconds)
}

//adding event listener to startbtn
startbtn.addEventListener('click', () => {
    timerId = starttimer(WORK_TIME);
    updateTitle("it's Work Time")
})

// adding event listener to resetbtn
resetbtn.addEventListener("click",()=>{
   stopTimer();
   timer.textContent = "25:00"
   updateTitle("Reset")
})


pausebtn.addEventListener("click",()=>{
   stopTimer();
   Pause = true;
   updateTitle("Timer Paused")
})


resumebtn.addEventListener("click",()=>{
   if(Pause){
   const currentTime = getTimeInSeconds(timer.textContent)
   timerId = starttimer(currentTime)
   Pause = false
   (!oneRoundCompleted) ? updateTitle("It's Work Time") : updateTitle("It's Break Time")
   }
})

const showPomoCounts = () => {
    const counts = JSON.parse(localStorage.getItem("pomoCounts"))
    if (counts > 0) {
        pomoCountsDisplay.style.display = "flex"
    }
    pomoCountsDisplay.firstElementChild.textContent = counts;
}


showPomoCounts()