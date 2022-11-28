import '../styles/App.scss';
import { useState, useEffect } from 'react';
import { fetchAdalabers } from '../services/api'

function App() {
  //variables de estado
  const [adalabers, setAdalabers] = useState([])
  const [newAdalaber, setNewAdalaber] = useState({
    name: '',
    counselor: '',
    speciality: '',
    id: '',
    social_networks: []
  })
  //variables de búsqueda
  const [searchValue, setSearchValue] = useState('');
  const [searchCounselor, setSearchCounselor] = useState('');

  //llamada a la API
  useEffect(() => {
    fetchAdalabers().then((data) => {
      setAdalabers(data.results)
    })
  }, []);
  //para que no se envíe el formulario al pulsar intro
  const handleSubmit = (ev) => {
    ev.preventDefault();
  };
  //guardar los input en una nueva variable de estado
  const handleInput = (ev) => {
    const inputName = ev.target.name;
    const inputValue = ev.target.value;
    const randomID = crypto.randomUUID()
    setNewAdalaber(
      { ...newAdalaber, [inputName]: inputValue, id: randomID }
    )
  };
  //añadir el nuevo contacto al array de objetos
  const handleAdd = () => {
    setAdalabers([...adalabers, newAdalaber])
    setNewAdalaber({
      name: '',
      counselor: '',
      speciality: '',
      id: '',
      social_networks: []
    })
  };
  //filtrar por nombre
  const handleSearchName = (ev) => {
    setSearchValue(ev.target.value)
  };
  const handleSearchCounselor = (ev) => {
    setSearchCounselor(ev.target.value)
  };

  //pintar la tabla con los contactos
  const renderAdalaber = () => {
    return adalabers
      .filter((each) => each.name.toLowerCase().includes(searchValue.toLowerCase()))
      .filter((each) => each.counselor.toLowerCase().includes(searchCounselor))
      .map((each) => (
        <tr key={each.id}>
          <td>{each.name}</td>
          <td>{each.counselor}</td>
          <td>{each.speciality}</td>
          <td>
            {each.social_networks.map((socialNetwork, index) =>
              <a href={socialNetwork.url} key={index}>{socialNetwork.name}</a>)}
          </td>
        </tr>))
  };
  return (
    <div className='App'>
      <header>
        <h1>Adalabers</h1>
        <h2>Busca una Adalaber</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="searchName">Nombre:</label>
          <input type="text" name="searchName" value={searchValue} onChange={handleSearchName} />
          <label htmlFor="searchCounselor">Tutora:
            <select name="searchCounselor" id='searchCounselor' value={searchCounselor} onChange={handleSearchCounselor} >
              <option value="">cualquiera</option>
              <option value="yanelis">Yanelis</option>
              <option value="dayana">Dayana</option>
              <option value="iván">Iván</option>
            </select>
          </label>
        </form>
      </header>
      <table className="table">
        {/* <!-- Fila de cabecera --> */}
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tutora</th>
            <th>Especialidad</th>
            <th>Redes</th>
          </tr>
        </thead>
        {/* <!-- Cuerpo de la tabla --> */}
        <tbody>
          {renderAdalaber()}
        </tbody>
      </table>
      {/* <!-- Formulario nueva Adalaber --> */}
      <section>
        <h2>Añadir una nueva Adalaber</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Nombre:</label>
          <input type="text" name="name" id="name" value={newAdalaber.name} onChange={handleInput} />
          <label htmlFor="counselor">Tutora:</label>
          <input type="text" name="counselor" id="counselor" value={newAdalaber.counselor} onChange={handleInput} />
          <label htmlFor="speciality">Especialidad:</label>
          <input type="text" name="speciality" id="speciality" value={newAdalaber.speciality} onChange={handleInput} />
          <button onClick={handleAdd}>Añadir</button>
        </form>
      </section>
    </div>
  );
}

export default App;
