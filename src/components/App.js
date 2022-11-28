import '../styles/App.scss';
import contact from '../services/api.json'
import { useState } from 'react';

function App() {
  //variables de estado
  const [adalabers, setAdalabers] = useState(contact.results)

  //para que no se envíe el formulario al pulsar intro
  const handleSubmit = (ev) => {
    ev.preventDefault();
  };
  const handleInput = () => { };
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
      <section>
        <h2>Añadir una nueva Adalaber</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Nombre:</label>
          <input type="text" name="name" id="name" onChange={handleInput} />
          <label htmlFor="counselor">Tutora:</label>
          <input type="text" name="counselor" id="counselor" onChange={handleInput} />
          <label htmlFor="speciality">Especialidad:</label>
          <input type="text" name="speciality" id="speciality" onChange={handleInput} />
        </form>

      </section>
    </div>
  );
}

export default App;
