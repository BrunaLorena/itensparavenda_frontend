import React, { useState, useMemo } from 'react';
import Header from './Header';
import api from './api';
import{ interval } from 'rxjs';

function ListaPage() {

    const [produtos, setProdutos ] = useState([]);
    const [loading, setLoading ] = useState(true);
    
  async function loadData() {
      const response = await api.get('/');
      setProdutos (response.data);
      setLoading(false);
    }

    useMemo(loadData, []);

    return <div>
        <Header/>
        { loading == true
        ? <span> Carregando Lista...</span>
        : <table>
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
        }
    </div> 
}

export default ListaPage;