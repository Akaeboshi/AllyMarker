import "./styles.css";
import pin from "./Images/pin.png";
import { IMaskInput } from "react-imask";
import { useEffect, useState } from "react";
import Select from "react-select";

function App() {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countries = await fetch("https://amazon-api.sellead.com/country");
        setCountries(await countries.json());

        const cities = await fetch("https://amazon-api.sellead.com/city");
        setCities(await cities.json());
      } catch (erro) {
        console.log(erro);
      }
    };
    fetchData();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(
      { name: e.target.elements.nome.value },
      { email: e.target.elements.email.value },
      { telefone: e.target.elements.telefone.value },
      { cpf: e.target.elements.cpf.value }
    );
    try {
      let paises = "";
      e.target.elements.pais.forEach((pais) => (paises += `${pais.value}, `));
      console.log({
        pais: paises.substring(0, paises.length - 2),
      });
    } catch (valorSingular) {
      console.log({ pais: e.target.elements.pais.value });
    }
    try {
      let cidades = "";
      e.target.elements.cidade.forEach(
        (cidade) => (cidades += `${cidade.value.split(",")[0]}, `)
      );
      console.log({
        cidade: cidades.substring(0, cidades.length - 2),
      });
    } catch (valorSingular) {
      console.log({ cidade: e.target.elements.cidade.value.split(",")[0] });
    }
  }
  const paisesMap = countries.map((countries) => {
    return { label: countries.name, value: countries.name };
  });

  const cidadesMap = cities.map((cities) => {
    return { label: cities.name, value: cities.name };
  });

  const customStyles = {
    control: () => ({
      display: "flex",
      margin: "0.6rem 0",
      padding: "0.3rem 0.8rem",
      minWidth: "200px",
      maxWidth: "370px",
      justifyContent: "space-between",
      width: "100%",
      fontColor: "gray",
      maxHeight: "42px",
      borderRadius: "10px",
      backgroundColor: "field",
      boxShadow: "1px 1px 6px #0000001c",
    }),
    multiValue: () => ({
      backgroundColor: "none",
      textOverflow: "ellipsis",
    }),
    multiValueRemove: (base) => ({
      ...base,
      display: "none",
    }),
    valueContainer: (base) => ({
      ...base,
      overflow: "auto",
      display: "flex",
      flexWrap: "wrap",
      textOverflow: "ellipsis",
      alignItems: "center",
    }),
    placeholder: () => ({
      fontSize: "15px",
    }),
    indicatorSeparator: (base) => ({
      ...base,
      display: "none",
    }),
    menu: (base) => ({
      ...base,
      margin: "0",
    }),
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container">
        <div className="dados">
          <h3>Seus Dados</h3>
          <div className="form">
            <div className="input-group">
              <div className="input-box">
                <label>Nome</label>
                <input
                  type="text"
                  placeholder="Digite seu nome"
                  id="nome"
                  name="nome"
                  required
                />
              </div>
              <div className="input-box">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="Digite seu E-mail"
                  id="email"
                  name="email"
                  required
                />
              </div>
              <div className="input-box">
                <label>Telefone</label>
                <IMaskInput
                  type="text"
                  mask="(00) 00000-0000"
                  placeholder="(xx) xxxxx-xxxx"
                  id="telefone"
                  name="telefone"
                  required
                />
              </div>
              <div className="input-box">
                <label>CPF</label>
                <IMaskInput
                  type="text"
                  mask="000.000.000-00"
                  placeholder="Digite seu CPF"
                  id="cpf"
                  name="cpf"
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div className="destinos">
          <h3>Destinos de Interesse</h3>
          <div className="form">
            <div className="input-group">
              <div>
                <label>País</label>
                <Select
                  placeholder="Escolha o país"
                  id="pais"
                  className="select"
                  name="pais"
                  options={paisesMap}
                  isSearchable={true}
                  styles={customStyles}
                  isMulti
                  required
                ></Select>
              </div>
              <div>
                <label>Cidade</label>
                <Select
                  placeholder="Escolha a cidade"
                  id="cidade"
                  className="select"
                  name="cidade"
                  options={cidadesMap}
                  isSearchable={true}
                  styles={customStyles}
                  isMulti
                  required
                ></Select>
              </div>
            </div>
            <div className="button">
              <button id="button" type="submit">
                Enviar
              </button>
            </div>
          </div>
        </div>
        <div className="descricao">
          <img src={pin} alt="Ally Marker logo"></img>
          <p>
            &nbsp;&nbsp;&nbsp;O Ally Marker é uma interface web feita para você,
            aqui você consegue marcar seus destinos de interesse e aproveitar
            uma experiencia incrível com tudo que um site pode oferecer.{" "}
          </p>
          <br></br>
          <p>
            &nbsp;&nbsp;&nbsp;Essa aplicação foi feita por uma equipe
            gigante(uma pessoa) com os desenvolvedores web mais qualificados do
            mercado(só um)! Podemos observar que ela é responsiva e roda até em
            celular(grande coisa).
          </p>
          <br></br>
          <p>
            &nbsp;&nbsp;&nbsp;Aproveite bem o seu tempo aqui, pois o site é
            grande e cheio de funções. Ah sim, e caso tenha qualquer dúvida com
            nosso(meu) produto, entre em contato com nosso suporte:{" "}
            <a href="https://www.linkedin.com/in/lucas-heler-lopes-45741b20a/">
              (61)9115-2252
            </a>
          </p>
          <br></br>
        </div>
      </div>
    </form>
  );
}

export default App;
