const SQUARE_WIDTH = 120;
const SPACE = 20;
const PADDING = 50;

const connection = [];

let polygon_counter = 1;
let selection = ["", ""];

const pairs = [
  {
    name: "bungalow",
    img: "/angielski/img/connect/bungalow.png",
  },
  {
    name: "block of flats",
    img: "/angielski/img/connect/block_of_flats.png",
  },
  {
    name: "cottage",
    img: "/angielski/img/connect/cottage.png",
  },
  {
    name: "detached house",
    img: "/angielski/img/connect/detached_house.png",
  },
  {
    name: "semi-detached house",
    img: "/angielski/img/connect/semi-detached_house.png",
  },
  {
    name: "terraced house",
    img: "/angielski/img/connect/terraced_house.png",
  },
];
let data = [];
for (let pair in pairs) {
  data.push({
    id: pair,
    name: pairs[pair].name,
  });
}
let data_copy = [];
for (let i = 0; i < pairs.length; i++) {
  data_copy.push(data.splice(Math.floor(Math.random() * data.length), 1)[0]);
}
const game = document.querySelector("#connect");
const handleClicked = (evt) => {
  let elem = evt.currentTarget;
  console.log("clicked");
  if (elem.id.charAt(0) == "i") {
    selection[0] = elem.id;
  } else {
    selection[1] = elem.id;
  }
  if (selection[0] != "" && selection[1] != "") createConnection();
};
const drawImage = (img, x, y, width, name) => {
  game.innerHTML += `<image href="${img}" x="${x}" y="${y}" height="${width}" width="${width}" id="${name}"/>`;
};

const drawRectWithText = (text, x, y, width, name) => {
  text = text.split(" ");
  let output = "";
  for (let i = 0; i < text.length; i++) {
    output += `<tspan x="50%" y=${35 + 20 * (i + 1)}>${text[i]} </tspan>`;
  }
  game.innerHTML += `
    <svg width="${width}" height="${width}" x="${x}" y="${y}" id="${name}">
        <rect x="${0}" y="${0}" width="${width}" height="${width}" fill="coral"></rect>
        <text x="50%" y="${y + 10}">
            ${output}
        </text>
    </svg>`;
};

const removeDuplicates = () => {
  for (let i = 0; i < connection.length; i++) {
    let currentItem = connection[i];
    for (let j = i + 1; j < connection.length; j++) {
      if (
        connection[j][0] === currentItem[0] ||
        connection[j][1] === currentItem[1]
      ) {
        document.getElementById(connection[i][2]).remove();
        connection.splice(i, 1);
        i--;
      }
    }
  }
};

const check = () => {
  let success = false;
  if (connection.length == 6) {
    success = true;
    for (let i = 0; i < 6; i++){if (connection[i][0].charAt(3) !== connection[i][1].charAt(4)) {
        success = false;
        break;
      }
    }
  }
  return success;
}

const success = () => {
  game.innerHTML = `<text x="50%" y="50%" style="fill:chartreuse; font-size: 46px;">
            You win
        </text>`
}

const createConnection = () => {
  connection.push([selection[0], selection[1], polygon_counter]);
  removeDuplicates();
    let elem1 = document.querySelector(`#${selection[0]}`);
    let elem2 = document.querySelector(`#${selection[1]}`);
    let elem1_height =
      parseInt(elem1.getAttribute("y")) +
      parseInt(elem1.getAttribute("height")) -
      25;
    let elem2_height = parseInt(elem2.getAttribute("y"));

    let elem1_x_point =
      parseInt(elem1.getAttribute("x")) +
      parseInt(elem1.getAttribute("width")) * 0.5;
    let elem2_x_point =
      parseInt(elem2.getAttribute("x")) +
      parseInt(elem2.getAttribute("width")) * 0.5;
    
  selection = ["", ""];
    game.innerHTML += `<polygon id="${polygon_counter}"
    points="${elem1_x_point - 10},${elem1_height} ${
      elem1_x_point + 10
    },${elem1_height} ${elem2_x_point + 10},${elem2_height} ${
      elem2_x_point - 10
    },${elem2_height}" style="fill:white;stroke:white;stroke-width:1" />`;
  
  for (let i = 0; i < pairs.length; i++) {
    document
      .querySelector(`#img${i}`)
      .addEventListener("click", handleClicked, false);
    document
      .querySelector(`#card${i}`)
      .addEventListener("click", handleClicked, false);
  }
  polygon_counter++;
  if (check()) success();
};
const drawConnect = () => {
  for (let i = 0; i < pairs.length; i++) {
    let pop = data_copy[i];
    drawImage(
      pairs[i].img,
      PADDING - 20 + (3 * SPACE + SQUARE_WIDTH) * i,
      PADDING + SPACE,
      SQUARE_WIDTH + SPACE,
      `img${i}`
    );
    drawRectWithText(
      pop.name,
      PADDING + 10 + (2 * SPACE + SQUARE_WIDTH) * i,
      500 - PADDING - SQUARE_WIDTH - SPACE,
      SQUARE_WIDTH + 20,
      `card${pop.id}`
    );
  }
};
drawConnect();
for (let i = 0; i < pairs.length; i++) {
  console.log(12);
  document
    .querySelector(`#img${i}`)
    .addEventListener("click", handleClicked, false);
  document
    .querySelector(`#card${i}`)
    .addEventListener("click", handleClicked, false);
}
