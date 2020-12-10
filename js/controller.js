'use strict';
console.log('welcome');
var gCanvas;
var gCtx;
// var gIsMouseDown;
// var gIsMouseOnTxt;
// var gCurrLineIdx;

function onInit() {
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d');
    initMemesServices();
    renderImgs();
}
function onAddLine() {
    document.querySelector('input[name=txt-input]').value = ''
    addLine();
    drawCanvas();
}

function onRemoveLine() {
    document.querySelector('input[name=txt-input]').value = ''
    removeLine();
    drawCanvas();
}

function onChangeFontSize(num) {
    changeFontSize(num);
    drawCanvas()
}

function drawTxt() {
    const lines = getLines();
    lines.forEach(function(line) {
        gCtx.font = `${line.size}px ${line.family}`;
        gCtx.lineWidth = line.lineWidth;
        gCtx.textAlign = line.textAlign;
        gCtx.textBaseline = line.textBaseline;
        gCtx.strokeStyle = line.strokeColor
        gCtx.fillStyle = line.fillColor
        gCtx.fillText(line.txt, line.pos.x, line.pos.y)
        gCtx.strokeText(line.txt, line.pos.x, line.pos.y)
    });
}

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL()
    elLink.href = data
}

function uploadImg(elForm, ev) {
    ev.preventDefault();
    document.getElementById('imgData').value = gCanvas.toDataURL("image/jpeg");

    function onSuccess(uploadedImgUrl) {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}`)
    }

    doUploadImg(elForm, onSuccess);
}

function drawCanvas() {
    const img = getCurrImg();
    var elImg = new Image();
    elImg.src = img.url;
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
        drawTxt();
    }
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container');
    const canvasSize = (elContainer.offsetWidth > elContainer.offsetHeight) ? (elContainer.offsetHeight) : (elContainer.offsetWidth);
    gCanvas.width = canvasSize;
    gCanvas.height = canvasSize;
}

function onImgClicked(id) {
    showMemeEditor()
    resizeCanvas();
    createMeme(gCanvas.width, id);
    drawCanvas();
}

function showMemeEditor() {
    document.querySelector('input[name=txt-input]').value = ''
    document.querySelector('.img-gallery').classList.add('hide');
    document.querySelector('.meme-editor-container').classList.remove('hide');
    document.querySelector('.general-container').classList.add('screen-size');
    document.querySelector('.general-container').classList.remove('content-size');
}

function renderImgs() {
    const imgs = getImgs();
    var strHTML = imgs.reduce(function(str, img) {
        return str + `<img src="${img.url}" onclick="onImgClicked(${img.id})" alt="">`
    }, '')
    document.querySelector('.img-container').innerHTML = strHTML;

}


function changeContainers(page) {
    const elContainers = document.querySelectorAll('.page-container');
    elContainers.forEach(function(elContainer) {
        if (elContainer.classList.contains(page)) {
            elContainer.classList.remove('hide');
            showActive(page);
        } else {
            elContainer.classList.add('hide');
        }
        if (elContainer.classList.contains('gallery-container')) onGalleryClicked();
    });
}

function showActive(page) {
    var elLis = document.querySelectorAll('nav ul li');
    elLis.forEach(function(elLi) {
        if (elLi.classList.contains(`go-to-${page}`)) {
            elLi.classList.add('active');
        } else {
            elLi.classList.remove('active');
        }
    });
}

function onGalleryClicked() {
    document.querySelector('.img-gallery').classList.remove('hide');
    document.querySelector('.meme-editor-container').classList.add('hide');
    document.querySelector('.general-container').classList.remove('screen-size');
    document.querySelector('.general-container').classList.add('content-size');
}
// BEFORE MAKE BALAGAN
// function onInit() {
//     console.log('init');
//     gCanvas = document.querySelector('#canvas');
//     gCtx = gCanvas.getContext('2d');
//     initMemesServices(); 
//     renderImgs(); 
// }

// function onAddLine() {
//     document.querySelector('input[name=txt-input]').value = '';
//     addLine(); 
//     drawCanvas(); 
// }

// function onRemoveLine() {
//     document.querySelector('input[name=txt-input]').value = ''
//     removeLine();
//     drawCanvas();
// }


// function onChangeFillColor(elColor) {
//     changeFillColor(elColor.value);
//     drawCanvas();
// }

// function renderImgs() {
//     console.log('renderimg');
//     const imgs = getImgs(); 
//     var strHTML = imgs.reduce(function(str, img){
//         return str + `<img src="${img.url}" onclick="onImgClick(${img.id})" alt="">`
//     }, '')
//     document.querySelector('.img-container').innerHTML = strHTML;
// }


// function drawTxt() {
//     console.log('drawTXT');
//     const lines = getLines(); //V
//     lines.forEach(function(line) {
//         gCtx.font = `${line.size}px ${line.family}`;
//         gCtx.lineWidth = line.lineWidth;
//         gCtx.textAlign = line.textAlign;
//         gCtx.textBaseline = line.textBaseline;
//         gCtx.strokeStyle = line.strokeStyle;
//         gCtx.fillStyle = line.fillStyle;
//         gCtx.fillText(line.txt, line.pos.x, line.pos.y);
//         gCtx.strokeText(line.txt, line.pos.x, line.pos.y);
//     })
// }


// function drawCanvas() {
//     console.log('test line 48');
//     const img = getCurrImg(); 
//     console.log('drawme');
//     var elImg = new Image();
//     elImg.src = img.url;
//     elImg.onload = () => {
//         gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);
//         drawTxt(); 
// }
// }

// function onImgClicked(id) {
//     showMemeEditor(); 
//     resizeCanvas(); 
//     createMeme(gCanvas.width, id); //V
//     drawCanvas();
// }

// function showMemeEditor() {
//     document.querySelector('input[name=txt-input]').value = '';
//     document.querySelector('.img-gallery').classList.add('hide');
//     document.querySelector('.meme-editor-container').classList.remove('hide');
//     document.querySelector('.general-container').classList.add('screen-size');
//     document.querySelector('.general-container').classList.remove('screen-size');
// }

// function resizeCanvas() {
//     const elContainer = document.querySelector('.canvas-container');
//     const canvasSize = (elContainer.offsetWidth > elContainer.offsetHeight) ? (elContainer.offsetHeight) : (elContainer.offsetWidth);
//     gCanvas.width = canvasSize;
//     gCanvas.height = canvasSize;
// }

// function hideContainersExcept(page) {
//     const elContainers = document.querySelector('.page-container');
//     elContainers.forEach(function(elContainer){
//         if (elContainer.classList.contains(page)){
//             elContainer.classList.remove('hide');
//             showActive(page);
//         } else {
//             elContainer.classList.add('hide');
//         }
//         if (elContainer.classList.contains('gallery-container')) onGalleryClicked();
//         if (elContainer.classList.contains('memes-container')) renderSavedMemes();
//     })
// }

// function toggleNav() {
//     document.querySelector('nav ul').classList.toggle('open nav');
//     const elBtns = document.querySelector('.btn-hamburger img');
//     elBtns.forEach(btn => btn.classList.toggle('hide'));
// }

// function changeContainers(page) {
//     const elContainers = document.querySelectorAll('.page-container');
//     elContainers.forEach(function(elContainer) {
//         if (elContainer.classList.contains(page)) {
//             elContainer.classList.remove('hide');
//             showActive(page);
//         } else {
//             elContainer.classList.add('hide');
//         }
//         if (elContainer.classList.contains('gallery-container')) onGalleryClicked();
//     });
// }

// function renderSavedMemes() {
//     const elSavedMemes = document.querySelector('.memes-container .saved-memes-imgs');
//     const memes = getSavedMemes();
//     var strHTML = memes.reduce(function(str, meme){
//         return str + `<div class="meme-img">
//         <img src="${meme.memeImg}" alt="">
//         <div class"btns-container">
//         <button class="btn btn-delete" onclick="onRemoveMeme('${meme.id}')">Delete</button>
//         <button class="btn btn-edit" onclick="onEditMeme('${meme.id}')">Edit</button>
//         </div>
//         </div>
//         `
//     }, '');
//     elSavedMemes.innerHTML = strHTML;
// }