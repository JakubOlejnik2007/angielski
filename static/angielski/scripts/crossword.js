const SQUARE_WIDTH = 40;
const PADDING = 90;

const ctx = document.getElementById("crossword").getContext("2d");

let questionSpan = document.getElementById("number");

const crosswordData = {
  word: "CONSERVATORY",
  layout: [
    "  detaChed",
    "     mOdern",
    "   opeN-plan",
    "    deSk",
    "   basEment",
    "   bedRoom",
    "      Village",
    "     nArrow",
    "concreTe",
    " spaciOus",
    "    fuRniture",
    "   cosY",
  ],
  answers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  colors: {
    word: "#f1fb7b",
    border: "coral",
    currently_selected: "chartreuse",
    correct_word: "#ff2121"
  },
};

class Crossword {
  current_question = 1;

  description = document.querySelector("#showDescription");
  

  constructor(width, padding, data) {
    this.description.style.visibility = "hidden";
    this.width = width;
    this.padding = padding;
    this.data = data;
  }
  wordToShow = "____________";

  drawRectangle(x, y, width, color) {
    ctx.beginPath();
    ctx.lineWidth = "2";
    ctx.strokeStyle = crosswordData.colors.border;
    ctx.rect(x, y, width, width);
    ctx.stroke();
    if (color != "none") {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, width, width);
    }
  }

  writeText(text_id) {
    let text = crosswordData.layout[text_id].toUpperCase();
    let i = 0;
    for (let char in text) {
      if (text.charAt(char) != " ") {
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.strokeStyle = crosswordData.colors.border;
        ctx.rect(
          90 + i * this.width,
          10 + text_id * this.width,
          this.width,
          this.width
        );
        ctx.stroke();
        ctx.font = "25px monospace";
        ctx.fillStyle = crosswordData.colors.correct_word;
        ctx.fillText(
          text.charAt(char),
          86 + i * this.width + 15,
          18 + (text_id + 0.5) * this.width
        );
      }

      i++;
    }
  }

  generateWord() {
    let char = (i) => {
      if (typeof crosswordData.answers[i] == "undefined") {
        return crosswordData.word.charAt(i);
      } else {
        return "_";
      }
    };

    let result = document.querySelector("#showWord");
    this.word = "";
    for (let i = 0; i < 12; i++) {
      this.word += char(i);
    }
    result.innerHTML = this.word;
  }

  drawCrossword() {
    
    ctx.beginPath();
    ctx.fillStyle = "#1d1d1d";
    ctx.fillRect(0, 0, 700, 500);
    ctx.beginPath();
    ctx.fillStyle = "crimson";
    for (let i = 0; i < 12; i++) {
      let z = crosswordData.layout[i].length;
      
      for (let j = 0; j < 13; j++) {
        if (j < z) {
          let char = crosswordData.layout[i].charAt(j);
          let color = "none";
          if (char.toUpperCase() == char && char != "-") {
            color = crosswordData.colors.word;
          }
          if (i + 1 == this.current_question)
            color = crosswordData.colors.currently_selected;
          if (char != " ")
            this.drawRectangle(
              90 + j * this.width,
              10 + i * this.width,
              this.width,
              color
            );
        }
      }
      if (typeof crosswordData.answers[i] == "undefined") {
        this.writeText(i);
        continue;
      }
    }
  }
  findNextQuestion(multiplier = 1) {
    let k = this.current_question - 1;

    for (let i = 0; i < 12; i++) {
      if (k == 12 && multiplier == 1) k = -1;
      else if (k == 0 && multiplier == -1) k = 12;

      k += multiplier;

      if (typeof crosswordData.answers[k] != "undefined") {
        this.current_question = k + 1;
        return true;
      }
    }
    return false;
  }
  success(){
    this.description.style.visibility = "visible";
    this.drawCrossword();
    this.current_question = 2137;
  };
}

const crossword = new Crossword(SQUARE_WIDTH, PADDING);
crossword.drawCrossword();
crossword.generateWord();

const nextQuestion = (evt) => {
  let isFound = false;

  if (evt == "not evt") {
    isFound = crossword.findNextQuestion();
  } else {
    let isQuestionUp = evt.currentTarget.value;
    if (isQuestionUp) {
      isFound = crossword.findNextQuestion();
    } else if (!isQuestionUp) {
      isFound = crossword.findNextQuestion((multiplier = -1));
    }
  }
  console.log(crossword.current_question, isFound);
  if (isFound) {
    questionSpan.innerHTML = crossword.current_question;
    crossword.drawCrossword();
  } else {
    crossword.success();
  }
};

const check = (evt) => {
  let input = evt.currentTarget;
  console.log(
    input.value,
    crosswordData.layout[crossword.current_question - 1]
      .toLowerCase()
      .split(" ")
      .join("")
  );
  if (
    input.value.toLowerCase() ==
    crosswordData.layout[crossword.current_question - 1]
      .toLowerCase()
      .split(" ")
      .join("")
  ) {
    let index = crosswordData.answers.indexOf(crossword.current_question);
    delete crosswordData.answers[index];
    nextQuestion("not evt");
    input.value = "";
    crossword.generateWord();
    if (crossword.word == crosswordData.word) {
      crossword.success();
    } else {
      crossword.drawCrossword();
    }
  }
};



for (let i = 0; i < 2; i++) {
  let elem = document.querySelector(`#arrow${i + 1}`);
  if (i == 0) elem.value = false;
  else elem.value = true;
  elem.addEventListener("click", nextQuestion, false);
}
document.querySelector("#input").addEventListener("change", check, false);
