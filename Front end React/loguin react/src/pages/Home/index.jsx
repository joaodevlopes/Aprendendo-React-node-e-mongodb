import { useState, useEffect, useRef } from 'react' // React Hooks (Ferramenta do react)
import './style.css'
import api from '../../services/api'

import Trash from '../../assets/trash (2).png' /* importei a imagem do lixo */

function Home() {
  const [users, setUsers] = useState([])
  //      [onde esta os dados, responsavel por colocar os dados aqui dentro]

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()


  async function getUsers() {
    const usersFromApi = await api.get('/users');
    setUsers(usersFromApi.data);
  }

  async function createUsers() {
    await api.post('/users', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email:inputEmail.current.value
    });
    getUsers()
  }

  async function deleteUsers(id) {
    await api.delete(`users/${id}`);
    getUsers()
  }


  useEffect(() => {
    getUsers()
  }, [])





  return (

    <div className='container'>
      <form>
        <h1>Cadastro de Usuários</h1>
        <input name='name' type='text' placeholder='Digite seu nome' ref={inputName}/>
        <input name='age' type='number' placeholder='Digite sua idade' ref={inputAge}/>
        <input name='email' type='email' placeholder='Digite seu email' ref={inputEmail} />
        <button type='button'onClick={createUsers}>Cadastrar</button>
      </form>
      {users.map(user => (

        <div className='card' key={user.id}>
          <div>
            <p>Nome : {user.name} </p>
            <p>Idade :{user.age} </p>
            <p>Email : {user.email} </p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} />
          </button>
        </div>

      ))}

    </div>



  )
}

export default Home


/* cd "loguin react" se caso parar de rodar / npm install instala as dependencias de novo/ npm run dev criar um caminho para ver o site na web 
*/