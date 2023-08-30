import axios from "axios";
import { useState, useEffect } from "react";

import "./pages.css";

export default function Config() {
  const [nomeevento, setNomeevento] = useState("");
  const [ticketUrl, setTicketurl] = useState("");
  const [previwed, setPreviwed] = useState(null);
  const [evento, setEvento] = useState([]);

  const [statusEvento, setStatusEvento] = useState("Criacao");

  function fileSelect(event) {
    const { files } = event.target;

    if (!files) {
      return;
    }
    const previewUrl = URL.createObjectURL(files[0]);

    setPreviwed(previewUrl);
  }

  async function handleCreateEvent(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const fileToUpload = formData.get("convertUrl");

    let convertUrl = "";

    try {
      if (fileToUpload) {
        const uploadFormatData = new FormData();

        uploadFormatData.set("file", fileToUpload);

        const uploadResponse = await axios.post(
          "http://localhost:3005/upload",
          uploadFormatData
        );

        convertUrl = uploadResponse.data.fileUrl;

        const response = await axios.post("http://localhost:3005/criarevento", {
          nomeevento: formData.get("nomeevento"),
          ticketUrl: convertUrl,
        });
    
        if (response.status === 200) {
          window.location.reload();
          console.log("Evento criado com sucesso");
        } else {
          // alert('Erro ao criar evento')
        }
      }
    } catch  {
      console.log("chegou aqui");
    }

 
  }

  useEffect(() => {
    // Simulando uma chamada assíncrona para buscar os dados
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3005/buscarevento");
        const data = await response.json();
        setEvento(data); // Defina os dados no estado
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };

    fetchData();
  }, []);


  async function buscarEventoID(event) {
    const id = event.target.id;
    
    try {
        const response = await fetch(`http://localhost:3005/buscarevento/${id}`);
        const data = await response.json();
    
        console.log(data);
        setNomeevento(data.nomeevento);
        setTicketurl(data.ticketUrl);
    } catch (error) {
        console.error("Erro ao buscar os dados:", error);
    }
}


  return (
    <div className="config">
      <div className="cards">
        {evento.length > 0 ? (
          evento.map((Eventos) => (
            <div className="card">
              <div className="imagem">
                <img
                  src={`${Eventos.fotodoticket}`}
                  className="imagemCard"
                  alt=""
                />
              </div>
              <p>{Eventos.nomedoevento}</p>
              <button id={Eventos.id} className="buttoncard" onClick={buscarEventoID}>configuração do card</button>
            </div>
          ))
        ) : (
          <p className="loading">Carregando...</p>
        )}
      </div>

      <div className="configcard">

        <form onSubmit={handleCreateEvent} className="configevento" >
          <h1>Evento</h1>

          <div className="formconfig">
            <div className="input-group">
              <label>Nome do evento</label>
              <input
                id="nomeEvento"
                type="text"
                name="nomeevento"
                className="input"
                value={nomeevento}
                onChange={(e) => setNomeevento(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>imagem do ticket</label>
              <input
                id="imgevento"
                accept="image/*"
                name="convertUrl"
                type="file"
                className="inputimg"
                // value={ticketUrl}
                onChange={fileSelect}
                // onChange={handleCreateEvent}
              />
            </div>

            {previwed && <img src={previwed} alt="" className="prevwed" />}

            <div className="botoesevento">
              <button className="criarevento" id="criarevento" type="submit" >
                Criar evento
              </button>

              <button className="atualizarevento" id="atualizarevento"  >
                atualizar evento
              </button>
            </div>
          </div>
        </form>


      </div>
    </div>
  );
}
