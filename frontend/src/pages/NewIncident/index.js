import React,{useState} from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft} from 'react-icons/fi';
import LogoImg from '../../assets/logo.svg';
import api from '../../services/api';
import './style.css';
// import { Container } from './styles';

export default function NewIncident() {
    const[title, setTitle]= useState('');
    const[description, setDescription]= useState('');
    const[value, setValue]= useState('');
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();
   async  function handleNewIncident(e){
       e.preventDefault();
       const data = {
           title,
           description,
           value
       }

       try{


        await api.post('/incidents', data, {
            headers:{
                authorization: ongId,
            }
        });

        history.push('/profile');


       }catch(err){
           alert('Erro ao cadastrar caso, tente novamente')
       }

    }
  return (
    <div className="new-incident-container">
    <div className="content">
        <section>
            <img src={LogoImg} alt="Logo Be the Hero" />
            <h1>Cadastrar Novo Caso</h1>
            <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
            < Link className="back-link"to = "/profile">
                <FiArrowLeft size={16} color="#e02041"/> Voltar para Home.
                </Link>

            
            </section>
        <form onSubmit={handleNewIncident}>
            <input 
                placeholder="Titulo do Caso"
                name="title"
                type ="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                />

            <textarea 
                placeholder="Descrição do Caso"
                name="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                />

            <input 
                placeholder="Valor em Reais"
                name="value"
                type="number"
                value={value}
                onChange={e => setValue(e.target.value)}
                />


           

            <button type="submit" className="button">Cadastrar</button>


        </form>
    </div>
</div>
  );
}
