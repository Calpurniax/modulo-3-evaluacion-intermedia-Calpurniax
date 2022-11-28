import '../styles/App.scss';
import contact from '../services/api.json'
import { useState } from 'react';

function App() {
  const [adalabers, setAdalabers] = useState(contact.results)
  console.log(adalabers)
  const renderAdalaber = () => {
    return adalabers.map((each) => (
      <tr key={each.id}>
        <td>{each.name}</td>
        <td>{each.counselor}</td>
        <td>{each.speciality}</td>
      </tr>))
  }
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
        <tbody>
          {renderAdalaber()}
        </tbody>
      </table>
    </div>
  );
}

export default App;
