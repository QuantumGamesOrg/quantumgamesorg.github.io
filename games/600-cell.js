"use strict";

let content = document.getElementById("content");

let boardContainer = document.getElementById("boardContainer");

function setupBoard() {
const defaultBoardContainerSize = { width: parseInt(getComputedStyle(boardContainer).width), height: parseInt(getComputedStyle(boardContainer).height) };
// const defaultBoardContainerSize = { width: , height: };

let circleMap = [];
makeBoard(boardContainer, [
        [1, 2, 3, 4, 31, 42, 51, 16, 22, 60, 39, 28, 57, 23, 27, 40, 44, 29, 15, 52],
        [5, 6, 7, 8, 38, 24, 58, 25, 18, 47, 33, 55, 36, 53, 20, 46, 59, 26, 37, 21],
        [9, 10, 11, 12, 56, 45, 17, 35, 13, 32, 50, 41, 43, 49, 30, 14, 34, 19, 48, 54],
        [13, 14, 15, 16, 43, 54, 3, 28, 34, 12, 51, 40, 9, 35, 39, 52, 56, 41, 27, 4],
        [17, 18, 19, 20, 50, 36, 10, 37, 30, 59, 45, 7, 48, 5, 32, 58, 11, 38, 49, 33],
        [21, 22, 23, 24, 8, 57, 29, 47, 25, 44, 2, 53, 55, 1, 42, 26, 46, 31, 60, 6],
        [25, 26, 27, 28, 55, 6, 15, 40, 46, 24, 3, 52, 21, 47, 51, 4, 8, 53, 39, 16],
        [29, 30, 31, 32, 2, 48, 22, 49, 42, 11, 57, 19, 60, 17, 44, 10, 23, 50, 1, 45],
        [33, 34, 35, 36, 20, 9, 41, 59, 37, 56, 14, 5, 7, 13, 54, 38, 58, 43, 12, 18],
        [37, 38, 39, 40, 7, 18, 27, 52, 58, 36, 15, 4, 33, 59, 3, 16, 20, 5, 51, 28],
        [41, 42, 43, 44, 14, 60, 34, 1, 54, 23, 9, 31, 12, 29, 56, 22, 35, 2, 13, 57],
        [45, 46, 47, 48, 32, 21, 53, 11, 49, 8, 26, 17, 19, 25, 6, 50, 10, 55, 24, 30],
        [49, 50, 51, 52, 19, 30, 39, 4, 10, 48, 27, 16, 45, 11, 15, 28, 32, 17, 3, 40],
        [53, 54, 55, 56, 26, 12, 46, 13, 6, 35, 21, 43, 24, 41, 8, 34, 47, 14, 25, 9],
        [57, 58, 59, 60, 44, 33, 5, 23, 1, 20, 38, 29, 31, 37, 18, 2, 22, 7, 36, 42]
    ]);
buildScoreboard(15, 4, true);

// Reset button
document.querySelectorAll("#upperLeft button")[3].onclick = () => {document.querySelectorAll('#upperLeft option')[0].selected = true;  reset();}
// // TODO: these extra solve buttons are temporary
//var solutionElements = document.querySelectorAll('#upperLeft option');
//for (let i = 0; i < solutionElements.length; ++i) {
//    solutionElements[i].onclick = () => solve(solutionElements[i].value);
//}
// // shitty code - unnecessary for loop - resolved by calling javascript function from dropdown
// // comment from my friend: "Who fucking wrote this?"

document.querySelectorAll("#upperLeft button")[0].onclick = () => document.querySelector("#win_about").classList.toggle("hidden");
document.querySelectorAll("#upperLeft button")[1].onclick = () => document.querySelector("#win_rules").classList.toggle("hidden");
document.querySelectorAll("#upperLeft button")[2].onclick = () => window.scrollTo({top: document.querySelectorAll("#content > hr")[0].getBoundingClientRect().top + window.pageYOffset - 40, behavior: "smooth"});
document.getElementById("toTop").onclick = () => window.scrollTo({top: 0, behavior: "smooth"});

document.querySelectorAll(".person").forEach((e, i) => {
    e.onmouseenter = ev => {
        document.querySelectorAll(".personDesc")[Math.floor(i / 3)].classList.toggle("highlight", true);
    };
    e.onmouseleave = ev => {
        document.querySelectorAll(".personDesc")[Math.floor(i / 3)].classList.toggle("highlight", false);
    };
});

}
setupBoard();


function solve(size) {
    reset();

    if (size == '-') {return;}

    const solutions = {
        "26-13": [1, 10, 15, 18, 26, 28, 35, 39, 50, 54, 63, 71, 73],
        "30-15": [1, 4, 8, 12, 14, 18, 21, 22, 26, 28, 63, 66, 67, 71, 73],
        "32-17": [1, 4, 11, 15, 17, 21, 26, 28, 38, 48, 49, 55, 59, 61, 65, 71, 74],
        "33-17": [1, 4, 8, 9, 11, 24, 26, 27, 28, 38, 44, 47, 49, 55, 61, 66, 71],
        "34-17": [1, 4, 11, 18, 21, 26, 32, 35, 40, 53, 55, 56, 59, 69, 71, 72, 75],
        "36-19": [1, 4, 6, 12, 13, 18, 26, 29, 33, 42, 43, 46, 52, 53, 56, 59, 61, 71, 73],
        "37-19": [1, 4, 6, 12, 17, 26, 35, 38, 40, 41, 44, 48, 55, 63, 65, 66, 71, 74, 75],
        "38-19": [1, 2, 4, 5, 10, 26, 31, 34, 38, 40, 42, 44, 55, 62, 65, 69, 70, 71, 75],
        "38-21": [1, 4, 6, 7, 9, 12, 19, 23, 25, 26, 29, 35, 37, 40, 41, 44, 48, 55, 66, 69, 74],
        "39-21": [1, 4, 7, 11, 17, 19, 23, 26, 28, 29, 40, 42, 45, 47, 51, 53, 56, 63, 64, 67, 72],
        "40-21": [1, 4, 14, 17, 18, 22, 26, 28, 30, 33, 35, 43, 46, 50, 53, 54, 55, 57, 59, 67, 71],
        "41-21": [1, 10, 12, 13, 21, 24, 26, 31, 33, 34, 39, 40, 47, 49, 50, 55, 56, 58, 65, 67, 71],
        "42-21": [1, 6, 7, 25, 26, 27, 28, 29, 30, 32, 34, 38, 47, 49, 53, 70, 71, 72, 73, 74, 75],
        "43-23": [1, 2, 4, 11, 13, 15, 16, 24, 26, 27, 28, 35, 41, 44, 45, 50, 55, 61, 63, 65, 67, 68, 71],
        "44-23": [1, 2, 4, 5, 8, 10, 12, 17, 18, 24, 25, 26, 28, 30, 39, 46, 50, 55, 59, 61, 66, 71, 74],
        "45-23": [1, 4, 8, 10, 12, 13, 18, 20, 24, 26, 27, 28, 41, 46, 47, 52, 53, 55, 61, 63, 64, 65, 71],
        "46-23": [1, 4, 11, 12, 13, 17, 21, 26, 27, 28, 31, 35, 44, 47, 50, 55, 57, 59, 61, 65, 70, 71, 75],
        "48-25": [1, 3, 4, 14, 17, 24, 25, 26, 27, 28, 30, 31, 33, 34, 44, 46, 54, 55, 56, 57, 61, 69, 70, 71, 72],
        "49-25": [1, 2, 6, 7, 14, 15, 16, 25, 26, 27, 28, 33, 41, 45, 48, 49, 51, 55, 56, 57, 59, 65, 69, 70, 71],
        "50-25": [1, 3, 5, 10, 11, 16, 17, 21, 26, 27, 32, 33, 34, 40, 42, 47, 48, 49, 55, 57, 61, 62, 66, 71, 72],
        "53-27": [1, 2, 6, 8, 10, 12, 13, 14, 15, 16, 17, 18, 22, 24, 26, 28, 30, 33, 42, 47, 55, 61, 62, 63, 71, 74, 75],
        "54-27": [1, 3, 6, 7, 10, 11, 14, 16, 17, 18, 20, 21, 25, 26, 27, 31, 32, 33, 34, 35, 40, 41, 42, 48, 55, 61, 71],
    }

    let solution = solutions[size];

    // the basis index order in the DOM is like
    //  0   3   6   9  12
    //  1   4   7  10  13
    //  2   5   8  11  14
    // ------------------
    // 15  18 etc
    // 16  19
    // 17  20
    // but the numbers above treat it like
    //  0  15  30  45  60
    //  1  16  31  46  61
    //  2  17  32  47  62
    // ------------------
    //  3  18 etc
    //  4  19
    //  5  20

    function convert_index(i){
        var n = Math.floor((i % 15) / 3) * 15 + (i%3);
        return n + Math.floor(i / 15) * 3;
    }

    for(var i in solution){
        let basisSol = document.querySelectorAll(".basis");
        basisSol[convert_index(solution[i] - 1)].click();
    }

}