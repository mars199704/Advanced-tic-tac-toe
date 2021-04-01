;(function(){
  
  const xTurn = 'x'
  const oTurn = 'o'
  const getOneLine = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  let arr = [[],[],[],[],[],[],[],[],[]]
  let circleTurn
  
  //  before the game
  const background = document.querySelector('.background')
  const message = document.querySelector('.message')
  const rule = document.querySelector('.rule')
  const winnerMessage = document.querySelector('.result')
  const close = document.querySelectorAll('.close')
  
  //  about the game's logic
  const cells = document.querySelectorAll('.cell')
  const boards = document.querySelectorAll('.board')
  
  // add a p and put anything inside
  const winnerInner = document.createElement("p")
  const restartButton = document.querySelectorAll('.restart')
  
  // icon close click event
  close.forEach(closeIcon => {
    closeIcon.addEventListener('click', function(){
      background.classList.add("none")
      message.classList.add("none")
    })
  })
  
  //  after game starts, click events
  cells.forEach(cell => {
    cell.addEventListener('click', clickHandler, {once:true})
  })
  
  //  reset game button 
  restartButton.forEach(button => {
    button.addEventListener('click', function(){
      startGame()
      background.classList.add("none")
      message.classList.add("none")
      winnerInner.remove()
    })
  })
  
  //  after game starts, click functions
  function clickHandler(e){
    var cell = e.target
    const current = circleTurn ? oTurn : xTurn
    const thePlaceYouClick = cell.dataset.place
  
    const boardPlace = parseInt((thePlaceYouClick) / 9 )
    const cellPlace = (thePlaceYouClick) % 9
  
    // place the mark
    placeMark(cell, current, boardPlace, cellPlace)
  
    // lock board
    lockBoard(cellPlace, boardPlace)
  
    // switch turns
    switchTurns()
    switchHover()
  
    // check if you're win
    if(checkWin(boardPlace, current)){
      showResult(boardPlace)
      winnerInner.innerHTML = `${current} Win`
      winnerMessage.append(winnerInner)
      arr = [[],[],[],[],[],[],[],[],[]]
    }else if(arr[boardPlace].includes('lock')){
      showResult(boardPlace)
      winnerInner.innerHTML = `Draw !!!`
      winnerMessage.append(winnerInner)
      arr = [[],[],[],[],[],[],[],[],[]]
    }
  }
  
  
  function placeMark(cell, current, boardPlace, cellPlace) {
    arr[boardPlace][cellPlace] = current
    cell.classList.add(current)
  }
  
  function lockBoard(cellPlace, boardPlace){
      $(boards).removeClass('lock');
      $(boards[cellPlace]).siblings().addClass('lock');
      if(arr[boardPlace].length < 9 || arr[boardPlace].includes(undefined)){
        return
      }else{
        arr[boardPlace].push('lock')
      }
  }
  
  function switchTurns() {
    circleTurn = !circleTurn
  }
  
  function switchHover(){
    if(circleTurn){
      $(boards).each(function(){
        $(this).addClass(oTurn)
        $(this).removeClass(xTurn)
      });
    }else{
      $(boards).each(function(){
        $(this).addClass(xTurn)
        $(this).removeClass(oTurn)
      });
    }
  }
  
  function checkWin(boardPlace, current) {
    return getOneLine.some(combination => {
      return combination.every(index => {
        if(arr[boardPlace][index] == current){
          return current
        }else{
          return false
        }
      })
    })
  }
  
  function showResult(boardPlace){
    background.classList.remove("none")
    message.classList.remove("none")
    winnerMessage.classList.remove("none")
  
    $(boards).removeClass('lock');
    $(boards[boardPlace]).siblings().addClass('lock');
  }
  
  function startGame() {
    cells.forEach(cell => {
      cell.classList.remove(xTurn)
      cell.classList.remove(oTurn)
      cell.removeEventListener('click', clickHandler)
      cell.addEventListener('click', clickHandler, { once: true })
    })
    boards.forEach(board => {
      board.classList.remove('lock')
    })
  }

}())


