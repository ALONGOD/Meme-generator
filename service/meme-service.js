'use strict'

var gImgs = [{ id: 1, url: 'imgs/1.jpg', keywords: ['funny', 'cat'] }, { id: 2, url: 'imgs/2.jpg', keywords: ['funny', 'cat'] }, { id: 3, url: 'imgs/3.jpg', keywords: ['funny', 'cat'] }, { id: 4, url: 'imgs/4.jpg', keywords: ['funny', 'cat'] }, { id: 5, url: 'imgs/5.jpg', keywords: ['funny', 'cat'] }, { id: 6, url: 'imgs/6.jpg', keywords: ['funny', 'cat'] }, { id: 7, url: 'imgs/7.jpg', keywords: ['funny', 'cat'] }, { id: 8, url: 'imgs/8.jpg', keywords: ['funny', 'cat'] }, { id: 9, url: 'imgs/9.jpg', keywords: ['funny', 'cat'] }, { id: 10, url: 'imgs/10.jpg', keywords: ['funny', 'cat'] }, { id: 11, url: 'imgs/11.jpg', keywords: ['funny', 'cat'] }, { id: 12, url: 'imgs/12.jpg', keywords: ['funny', 'cat'] }, { id: 13, url: 'imgs/13.jpg', keywords: ['funny', 'cat'] }, { id: 14, url: 'imgs/14.jpg', keywords: ['funny', 'cat'] }, { id: 15, url: 'imgs/15.jpg', keywords: ['funny', 'cat'] }, { id: 16, url: 'imgs/16.jpg', keywords: ['funny', 'cat'] }]
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I eat Falafel',
            size: 50,
            color: 'black'
        },
        {
            txt: 'I Love Falafel',
            size: 50,
            color: 'pink'
        }
    ]
}
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }


function getMeme() {
    return gMeme
}

function setLineTxt(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text
}

function setColorTxt(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function getImgs() {
    return gImgs
}


function setImg(id) {
    var img = getImgs()[id - 1]
    var gMemeNew = {
        selectedImgId: id,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'I eat Falafel',
                x: 150,
                y: 150,
                size: 50,
                color: 'black'
            }
        ]

    }
    gMeme = gMemeNew
}


function changeFontSize(operator) {
    operator === '+' ? gMeme.lines[gMeme.selectedLineIdx].size += (10) : gMeme.lines[gMeme.selectedLineIdx].size -= (10)
}

function setNewLine() {
    var newLine = {
        txt: 'New Line',
        x: 100,
        y: 300,
        size: 30,
        color: 'black'
    }
    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx++
}

function switchSelectedLine() {
    var numLines = gMeme.lines.length
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx === numLines) gMeme.selectedLineIdx = 0

}


function moveLineRight() {
    gMeme.lines[gMeme.selectedLineIdx].x += 10
}
function moveLineLeft() {
    gMeme.lines[gMeme.selectedLineIdx].x -= 10
}
function moveLineUp() {
    gMeme.lines[gMeme.selectedLineIdx].y -= 10
}
function moveLineDown() {
    gMeme.lines[gMeme.selectedLineIdx].y += 10
}