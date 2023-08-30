import '../App.css'
import { useState } from 'react';
import html2canvas from 'html2canvas';


export default function Home() {

  const [username, setUsername] = useState('');
  const [semestre, setSemestre] = useState('');
  const [ra, setRa] = useState('');
  const [converter, setConverter] = useState("");


  const nameElement = document.querySelector('#name');
  const semestreElement = document.querySelector('#semestreinput');
  const raElement = document.querySelector('#rainput');
  const photoElement = document.querySelector('#photo');
  const errorElement = document.querySelector('#error');
  const buttonDownload = document.querySelector('#Download');

  const input = document.querySelector('#username');
  const inputsemestre = document.querySelector('#semestre');
  const inputra = document.querySelector('#ra');
  const button = document.querySelector('#gerarticket');

  let data;

   async function userRegister() {
    const username = input.value;
    const response = await fetch(`https://api.github.com/users/${username}`);
    data = await response.json();
    const name = data.name;
    const semestre = inputsemestre.value;
    const ra = inputra.value;
    const photo = data.avatar_url;

    if (name === undefined) {
    const urlImagem = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(username)}:${ra}:${encodeURIComponent(semestre)}`;

    setConverter(urlImagem)
    } else{

    const urlImagem = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(name)}:${ra}:${encodeURIComponent(semestre)}`;

    setConverter(urlImagem)
    }



    if (data !== undefined && data.message === 'Not Found' || input.value == '') {

      nameElement.style.display = 'block';
      photoElement.style.display = 'block';
      raElement.style.display = 'block';
      buttonDownload.style.display = 'block';

      nameElement.innerHTML = username;
      semestreElement.innerHTML = semestre;
      raElement.innerHTML = ra;
      photoElement.setAttribute('src', photodefault);

    } else {

      errorElement.style.display = 'none';
      nameElement.style.display = 'block';
      photoElement.style.display = 'block';
      raElement.style.display = 'block';
      buttonDownload.style.display = 'block';

      nameElement.innerHTML = name;
      semestreElement.innerHTML = semestre;
      raElement.innerHTML = ra;
      photoElement.setAttribute('src', photo);

    }

  };


  async function gerarticket() {

    const response = await fetch(`https://api.github.com/users/${username}`);
    data = await response.json();
  
    // Carregar a imagem
    const image = new Image();
    image.crossOrigin = "Anonymous"; // Define a política de mesma origem para a imagem
    image.src = data.avatar_url;
  
    // Esperar pelo carregamento da imagem
    await new Promise((resolve, reject) => {
      image.onload = resolve;
      image.onerror = reject;
    });
  
    // Agora que a imagem está carregada, podemos continuar com o html2canvas
    html2canvas(document.querySelector("#ticket"), { useCORS: true }).then(canvas => {
      const imageURL = canvas.toDataURL("image/png");
  
      const downloadLink = document.createElement("a");
      downloadLink.href = imageURL;
      downloadLink.download = "ticket.png";
  
      // Anexe o link ao corpo do documento
      document.body.appendChild(downloadLink);
  
      // Simule um clique no link para iniciar o download
      downloadLink.click();
  
      // Remova o link após o clique ser simulado
      document.body.removeChild(downloadLink);

    });
  };


  return (

    <div className="container">

      <div className="content">
        <h1>gere seu ticket e compartilhe com o mundo</h1>

        <label htmlFor="username">Digite seu usuário do GitHub ou seu nome completo</label>

        <div className="inputCadastro">

          <img src="/logo-github.svg" alt="" />
          <input
            type="text"
            id="username"
            placeholder="Nome de usuário"
            autoComplete="off"
          autoCapitalize="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="inputCadastro">
          <img src="/Semestre.svg" width="15" height="15" alt="" />
          <input
            type="text"
            id="semestre"
            placeholder="Digite seu semestre"
            autoComplete="off"
            autoCapitalize="off"
            value={semestre}
            onChange={(e) => setSemestre(e.target.value)}
          />
        </div>

        <div className="inputCadastro">
          <img src="/Semestre.svg" width="15" height="15" alt="" />
          <input
            type="text"
            id="ra"
            placeholder="Digite seu Ra"
            autoComplete="off"
            autoCapitalize="off"
            value={ra}
            onChange={(e) => {
              const numericValue = e.target.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
              setRa(numericValue);
            }}
          />
        </div>

        <span id="error">Usuário inválido. Verifique e tente novamente.</span>

        <button id="gerarticket" onClick={userRegister}>GERAR MEU TICKET</button>
      </div>

      <div className="ticket" id="ticket">
        <div className="ticket-container">

          {/* <img src="/img-cover-ticket.jpg" width="315" height="315" className="foto-ticket1" alt="" id='banner'/> */}

          <div className="foto-ticket" >
            <img src={converter} alt="" />
          </div>

          <div className="info">
            <div className="user-ticket-info">

              <img src="/img-avatar.png" className="photo" alt="" id="photo" />
              <span>TRIPULANTE</span>
              <h1 id="name">Seu nome aqui</h1>
              <p id="rainput" className="semestre">
                Seu Ra aqui
              </p>
              <p id="semestreinput" className="semestre">
                Seu Semestre aqui
              </p>
            </div>
            <div className="info-ticket-event">
              <div className="event-ticket-info">
                <span>EVENTO</span>
                <span>CARREATA FASIPE</span>
              </div>
              <div className="event-ticket-info">
                <span>DATA</span>
                <span>31 AGO. 2023</span>
              </div>
              <div className="event-ticket-info">
                <span>HORA</span>
                <span>19H</span>
              </div>
              <img src="/lines-svg.svg" alt="" />
            </div>
          </div>
        </div>
        <div className="download-button">
          <button id="Download" className="Download" onClick={gerarticket}>
            fazer Download
          </button>
        </div>
      </div>
    </div>
  );
}
