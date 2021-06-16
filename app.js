const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')

const colors = ['rgb(29, 252, 0)', 'rgb(238, 255, 0)', 'rgb(255, 0, 242)', 'rgb(255, 0, 0)', 'rgb(255, 0, 221)', 'rgb(0, 255, 234)']

let time = 0
let score = 0


startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) // Если есть класс time-btn 
    {
        time = parseInt(event.target.getAttribute('data-time')) // Получить значения data-time
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
        
    }
})


function startGame() {
    setInterval(decreaseTime, 1000) // Вызов функции каждую секнуду
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Cчет: <span class='primary'>${score}</span></h1>`
}

function createRandomCircle() {
    const circle = document.createElement('div') // Создать блок див
    const size = getRandomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect() // Получение выс и шир за счет встроенного метода 
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)
    const color = getRandomColor()

    circle.classList.add('circle') // Добавить ему класс
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.background = color
    circle.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`

    board.append(circle) // Добавление блока circle в блок board
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}


function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
}




