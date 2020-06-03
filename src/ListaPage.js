import React, { useState, useMemo } from 'react';
import Header from './Header';
import api from './api';
import { Table, TableRow, TableCell, Switch, Button} from '@material-ui/core';

function ListaPage() { 

    const [ itens, setitens ] = useState([]);

    async function loadData() { 
        const response = await api.get('/');
        setitens(response.data);
    }

    useMemo(loadData, []);

    return <>
        <Header/>
        <Table style={{marginTop: '80px', marginBottom: '20px'}}>
            {
                itens.map(item => (
                    <TableRow>
                        <TableCell>{item.id}</TableCell>
                        <TableCell style={{width: '70%'}}>{item.item}</TableCell>
                        <TableCell>{item.valor}</TableCell>
                        <TableCell>{item.tamanho}</TableCell>
                       
                    </TableRow>
                ))
            }
        </Table>

        <Button variant="contained" color="primary">Adicionar</Button>
    </>
}

export default ListaPage;