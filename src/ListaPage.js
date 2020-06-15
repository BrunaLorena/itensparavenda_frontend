import React, { useState, useMemo } from 'react';
import Header from './Header';
import api from './api';
import { Table, TableRow, TableCell, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

function ListaPage() { 

    const [ itensparavenda, setItensparavenda ] = useState([]);
    const [ item, setItem ] = useState('');
    const [ open, setOpen ] = useState(false);
    const [ valor, setValor ] = useState( );
    const [ tamanho, setTamanho ] = useState('');
    const [ id, setId ] = useState(0);
    

    async function loadData() { 

       const response = await api.get('/').then(response => {
            const itensparavenda = response.data;
            setItensparavenda(itensparavenda);
        })
    }

    useMemo(loadData, []);

    function openDialog() { 
        setOpen(true);
    }

     function closeDialog() {
        setOpen(false);
    }

    async function salvar() { 
        if(id === 0) {
        await api.post('/', { item, valor, tamanho }); 
        }
        else {
             await api.put(`/${id}`, { item, valor, tamanho });
        }

        loadData();
        setItem('');
        setValor();
        setTamanho('');
        setId(0);
        closeDialog();
    }

      async function apagar(id) {
        await api.delete(`/${id}`);
        loadData();
    }

    async function editar(itensparavenda) {
        setItem(itensparavenda.item);
        setValor(itensparavenda.valor);
        setTamanho(itensparavenda.tamanho);
        setId(itensparavenda.id);
        openDialog();
    }

  return (
        <>
            <Header />
            <Table style={{ marginTop: '80px' }}>

                {
                itensparavenda.map(setItensparavenda => (
                    <TableRow>
                        <TableCell>{itensparavenda.id}</TableCell>
                        <TableCell>{itensparavenda.item}</TableCell>
                        <TableCell>{itensparavenda.valor}</TableCell>
                        <TableCell>{itensparavenda.tamanho}</TableCell>
                     <Button variant="outlined"
                                    color="secondary"
                                    size="small"
                                    onClick={() => apagar(item.id)}>
                                    <DeleteIcon />Apagar
                                    </Button>
                    
                            <TableCell>
                                <Button variant="outlined"
                                    color="secondary"
                                    size="small"
                                    onClick={() => editar(item)}>
                                    Editar
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </Table>
        <Button
                onClick={openDialog}
                variant="contained"
                color="primary">Adicionar</Button>

        <Dialog open={open} onClose={closeDialog}>
            <DialogTitle>{id === 0 ? 'Novo Produto': 'Editar'} Item </DialogTitle>
            <DialogContent>{id === 0 ? 'Cadastrar': 'Edita'} Novo Item:
                <TextField
                    autoFocus
                    margin="dense"
                    id="item"
                    label="Item"
                    type="text"
                    fullWidth
                    value={item}
                    onChange={e => setItem(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="valor"
                    label="Valor"
                    type="text"
                    fullWidth
                    value={valor}
                    onChange={e => setValor(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="Tamanho"
                    label="Tamanho"
                    type="text"
                    fullWidth
                    value={tamanho}
                    onChange={e => setTamanho(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog}>Cancelar</Button>
                <Button onClick={salvar}>{id === 0 ? 'Salvar' : 'Atualizar'}</Button>
            </DialogActions>
        </Dialog>

        
    </>
  )

}

export default ListaPage;