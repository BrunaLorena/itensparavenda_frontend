import React, {useEffect, useState} from 'react';
import Header from './Header';
import api from './api';

function ListaPage() {

    const [produtos, setProdutos ] = useState([]);
    const [numero, setNumero ] = useState([1]);
    
  async function loadData(){
      const response = await api.get('/');
      const produtos = response.data;

      setProdutos(produtos);
       }

    useEffect(loadData,[]);

     return <div>
        <Header/>
        <table>
           { 
               produtos.map(item => (
                   <tr>
                       <td>{item.id}</td>
                       <td>{item.item}</td>
                       <td>{item.valor}</td>
                       <td>{item.tamanho}</td>
                   </tr>
               ))
            }
        </table>
     </div> 
}

export default ListaPage;