import './index.css';
import bank from "./question.json";

export default function App() {
  let time = 300;
  let score = 0;
  let left = 16;
  let q = 0;
  let timerInterval;
  let list = [];

  function startGame() {
    time = 300;
    score = 0;
    left = 16;
    list = [];
    while (list.length < 16) {
      let random = Math.floor(Math.random() * bank.length);
      if (!list.includes(random)) {
        list.push(random);
      }
      console.log(list);
    }
    document.getElementById('time').textContent = time;
    document.getElementById('score').textContent = score;
    document.getElementsByClassName("gameplay")[0].style.display = "grid";
    for (let i = 1; i <= 16; ++i) {
      document.getElementById(i).style.visibility = "visible";
    }
    document.getElementById("start").style.display = "none";

    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
      time--;
      document.getElementById('time').textContent = time;

      if (time <= 0 || left == 0) {
        clearInterval(timerInterval);
        document.getElementById('time').textContent = "KẾT THÚC";
        document.getElementById('scoreshow').style.display = "flex";
        document.getElementById('score').style.display = "flex";
        document.getElementById('scoreinfo').textContent = "SỐ ĐIỂM: " + score;
        document.getElementsByClassName("gameplay")[0].style.display = "none";
        document.getElementById("start").style.display = "flex";
        document.getElementById("ovc").style.display = "none";
      }
    }, 1000);
  };

  function ask(number) {
    const overlay = document.getElementById('ovc');
    overlay.style.display = 'flex';
    const content = document.getElementsByClassName('content');
    content[0].textContent = bank[list[number - 1]].question;
    document.getElementById('answerInp').value = "";
    q = number;
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function resultShow() {
    const overlay = document.getElementById('ovc');
    overlay.style.display = 'none';
    document.getElementById(q).style.visibility = "hidden";
    const noti = document.getElementById('noti')
    if (document.getElementById('answerInp').value === bank[list[q - 1]].ans) {
      score++;
      document.getElementById('score').textContent = score;
      noti.textContent = "CHÍNH XÁC";
      noti.style.backgroundColor = "#0CAE7C";
    } else {
      noti.textContent = "SAI RỒI";
      noti.style.backgroundColor = "#FF5B47";
    }
    noti.style.transform = 'translate(-50%, 110vh)';
    left--;
    await sleep(1000);
    noti.style.transform = 'translate(-50%, 0vh)';
  }

  function retryGame() {
    document.getElementById("scoreshow").style.display = "none";
  }

  return (
    <>
      <div className="App">
        <header className="header">
          <div id="time">300</div>
          <div id="score">0</div>
        </header>
        <div id='start' onClick={startGame}>BẮT ĐẦU</div>
        <div className="gameplay">
          <div className='question' id='1' onClick={() => ask(1)}>?</div>
          <div className='question' id='2' onClick={() => ask(2)}>?</div>
          <div className='question' id='3' onClick={() => ask(3)}>?</div>
          <div className='question' id='4' onClick={() => ask(4)}>?</div>
          <div className='question' id='5' onClick={() => ask(5)}>?</div>
          <div className='question' id='6' onClick={() => ask(6)}>?</div>
          <div className='question' id='7' onClick={() => ask(7)}>?</div>
          <div className='question' id='8' onClick={() => ask(8)}>?</div>
          <div className='question' id='9' onClick={() => ask(9)}>?</div>
          <div className='question' id='10' onClick={() => ask(10)}>?</div>
          <div className='question' id='11' onClick={() => ask(11)}>?</div>
          <div className='question' id='12' onClick={() => ask(12)}>?</div>
          <div className='question' id='13' onClick={() => ask(13)}>?</div>
          <div className='question' id='14' onClick={() => ask(14)}>?</div>
          <div className='question' id='15' onClick={() => ask(15)}>?</div>
          <div className='question' id='16' onClick={() => ask(16)}>?</div>
        </div>
      </div>
      <div id="ovc">
        <div id='overlay'>
          <div className='content'>1 + 1 = ?</div>
          <div className='input'>
            <input
              type='text'
              placeholder='Đáp số'
              id='answerInp'
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9,]/g, '');
              }}
            />
            <div className='submit' onClick={resultShow}>TRẢ LỜI</div>
          </div>
        </div>
      </div>
      <div id='noti'>CHÍNH XÁC</div>
      <div id='scoreshow'>
        <div id="scoreinfo">SỐ ĐIỂM: </div>
        <div id="retry" onClick={retryGame}>CHƠI LẠI</div>
      </div>
    </>
  );
}
