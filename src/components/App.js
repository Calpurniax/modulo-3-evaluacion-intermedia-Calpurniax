import '../styles/App.scss';
import contact from '../services/api.json'
import { useState } from 'react';

function App() {
  //variables de estado
  const [adalabers, setAdalabers] = useState(contact.results)
  const [newAdalaber, setNewAdalaber] = useState({
    name: '',
    counselor: '',
    speciality: '',
    id: '',
  })

  //para que no se envíe el formulario al pulsar intro
  const handleSubmit = (ev) => {
    ev.preventDefault();
  };
  //guardar los input en una nueva variable de estado
  const handleInput = (ev) => {
    const inputName = ev.target.name;
    const inputValue = ev.target.value;
    setNewAdalaber(
      { ...newAdalaber, [inputName]: inputValue }
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
    })
  };
  //pintar la tabla con los contactos
  const renderAdalaber = () => {
    return adalabers.map((each) => (
      <tr key={each.id}>
        <td>{each.name}</td>
        <td>{each.counselor}</td>
        <td>{each.speciality}</td>
      </tr>))
  };
  return (
    <div className='App'>
      <header><h1>Adalabers</h1></header>
      <table className="table">
        {/* <!-- Fila de cabecera --> */}
        <thead><tr>
          <th>Nombre</th>
          <th>Tutora</th>
          <th>Especialidad</th>
        </tr></thead>
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
