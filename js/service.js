'use strict';

var gImgs;
var gMeme;
var gSavedMemes;

function initMemesServices() {
    createImgs();

}

function changeLinePos(axis = 'y', num) {
    const newPos = getFocusedLine().pos[axis] + num
    if (newPos < 0 || newPos > gMeme.canvasSize) return;
    getFocusedLine().pos[axis] = newPos;
}

function changeFontFamily(font) {
    getFocusedLine().family = font;
}

function changeFontSize(num) {
    getFocusedLine().size += num;
}

function changeTxtAlign(align) {
    getFocusedLine().textAlign = align;
}

function changeStrokeColor(color) {
    getFocusedLine().strokeColor = color;
}

function changeFillColor(color) {
    getFocusedLine().fillColor = color;
}

function getLines() {
    return gMeme.lines;
}

function changeFocusedLine(idx) {
    if (idx) gMeme.selectedLineIdx = idx;
    else gMeme.selectedLineIdx = (gMeme.selectedLineIdx < gMeme.lines.length - 1) ? gMeme.selectedLineIdx + 1 : 0
}

function addLine() {
    if (gMeme.lines[gMeme.selectedLineIdx].txt === '')
        return;
    _createLine();
    changeFocusedLine();
    if (gMeme.selectedLineIdx < 2) {
        gMeme.lines[gMeme.selectedLineIdx].pos.y = gMeme.canvasSize - gMeme.lines[gMeme.selectedLineIdx].size / 2;
        return
    }
    gMeme.lines[gMeme.selectedLineIdx].pos.y = gMeme.canvasSize / 2;
}

function removeLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    changeFocusedLine();
}

function getFocusedLine() {
    return gMeme.lines[gMeme.selectedLineIdx];
}

function addTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt;
}

function getCurrImg() {
    var img = gImgs.find(function(img) {
        return (img.id === gMeme.selectedImgId);
    })
    return img;
}

function createMeme(canvasSize = 500, selectedImgId = 1) {
    const meme = {
        id: makeId(),
        memeImg: '',
        canvasSize,
        selectedImgId,
        selectedLineIdx: 0,
        lines: []
    }
    gMeme = meme;
    _createLine();
}

function _createLine() {
    const line = {
        txt: '',
        size: gMeme.canvasSize * 0.15,
        family: 'Impact',
        textAlign: 'center',
        lineWidth: gMeme.canvasSize * 0.008,
        strokeColor: 'black',
        fillColor: 'white',
        pos: {
            x: gMeme.canvasSize / 2,
            y: gMeme.canvasSize * 0.85,
        },
    }
    gMeme.lines.push(line)
}

function getImgs() {
    return gImgs;
}

function createImgs() {
    const imgs = [];
    for (let i = 0; i < 18; i++) {
        const img = _createImg(i + 1);
        imgs.push(img);
    }
    gImgs = imgs;
}

function _createImg(id) {
    const img = {
        id,
        url: `./meme-img/${id}.jpg`,
        keywords: []
    }
    return img;
}

//BEFORE MAKE BALAGAN
// function initMemesServices(){
//     createImgs(); //V
//     // setSavedMemes(); //todo
// }

// function getImgs(){
//     return gImgs;
// }

// function changeFillColor(color) {
//     getFocusedLine().fillColor = color;
// }


// function getLines() {
//     return gMeme.lines;
// }

// function createImgs(){
//     const imgs = [];
//     for (let i = 0; i < 18; i++) {
//         const img = _createImg(i + 1);
//         imgs.push(img);
//     }
//     gImgs = imgs;
// }

// function _createImg(id){
//     const img = {
//         id,
//         url: `./meme-img/${id}.jpg`,
//         keywords: []
//     }
//     return img;
// }

// function changeFocusedLine(idx) {
//     if (idx) gMeme.selectedLineIdx = idx;
//     else gMeme.selectedLineIdx = (gMeme.selectedLineIdx < gMeme.lines.length - 1) ? gMeme.selectedLineIdx + 1 : 0
// }

// function getFocusedLine() {
//     return gMeme.lines[gMeme.selectedLineIdx];
// }


// function addLine(){
//     if (gMeme.lines[gMeme.selectedLineIdx].txt === '') return;
//     _createLine(); //V
//     changeFocusedLine(); //V
//     if (gMeme.selectedLineIdx < 2) {
//         gMeme.lines[gMeme.selectedLineIdx].pos.y = gMeme.cancasSize - gMeme.lines[gMeme.selectedLineIdx].size / 2;
//         return;
//     }
//     gMeme.lines[gMeme.selectedLineIdx].pos.y = gMeme.cancasSize / 2;
// }

// function createMeme(canvasSize = 500, selectedImgId = 1){
//     const meme = {
//         id: makeId(),
//         memeImg: '',
//         canvasSize,
//         selectedImgId,
//         selectedLineIdx: 0,
//         lines: []
//     }
//     gMeme = meme;
//     _createLine();
// }
// function _createLine(){ 
//     const line = {
//         txt: '',
//         size: gMeme.canvasSize * 0.15, 
//         family: 'Impact', 
//         textAlign: 'center',
//         lineWidth: gMeme.canvasSize * 0.008,
//         strokeColor: 'block',
//         fillColor: 'white',
//         pos: {
//             x: gMeme.canvasSize / 2,
//             y: gMeme.canvasSize / 0.15,
//         }
//     }
//     gMeme.lines.push(line);
// }

// function changeLinePos(axis = 'y', num) {
//     const newPos = getFocusedLine().pos[axis] + num
//     if (newPos < 0 || newPos > gMeme.canvasSize) return;
//     getFocusedLine().pos[axis] = newPos;
// }

// function getCurrImg(){
//     var img = gImgs.find(function(img) {
//         return (img.id === gMeme.selectedImgId);
//     })
//     return img;
// }

// function getMemeIdById(memeId){
//     const memeIdx = gSavedMemes.findIndex(function(meme) {
//         return (meme.id === memeId);
//     })
//     return memeIdx;
// }