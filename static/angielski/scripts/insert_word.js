const form = document.getElementById("insert_word")

const answers = [
    1,
    3,
    4,
    2,
    3,
    4
]

const handleSubmit = (evt) => {
    evt.preventDefault();
    for (let i = 1; i <= 6; i++){
        let elem = document.getElementById(`${i}`);
        console.log(elem.value, answers[i-1], elem.value == answers[i-1])
        if (elem.value == answers[i - 1]) {
            elem.classList.remove("bad"); 
            elem.classList.add("good")
        } else {
            elem.classList.remove("good"); 
            elem.classList.add("bad")
        }
    }
}
const handleReset = (evt) => {
    for (let i = 1; i <= 6; i++){
        let elem = document.getElementById(`${i}`);
        elem.classList.remove("bad"); 
        elem.classList.remove("good")
    }
}

form.addEventListener("submit", handleSubmit, false)
form.addEventListener("reset", handleReset, false)