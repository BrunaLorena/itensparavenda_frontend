import React, { useState, useMemo } from 'react';
import Header from './Header';
import api from './api';
import { Table, TableRow, TableCell, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

function ListaPage() { 

    const [ item, setItem ] = useState([]);
    const [ open, setOpen ] = useState(false);
    const [ Valor, setValor ] = useState([]);
    const [ Tamanho, setTamanho ] = useState([]);
 

    async function loadData() { 
        const response = await api.get('/');
        setItem(response.data);
    }

    useMemo(loadData, []);

    function openDialog() { 
        setOpen(true);
    }

     function closeDialog() {
        setOpen(false);
    }

    async function salvar() { 
        await api.post('/', { Item, Valor, Tamanho }); 
        loadData();
        setItem('');
        setValor();
        setTamanho('');
        closeDialog();
    }

     async function apagar(id) { 
        await api.delete(`/${id}`);
        loadData();
    }
    return <>
        <Header/>
        <Table style={{marginTop: '80px', marginBottom: '20px'}}>
            {
                item.map(item => (
                    <TableRow>
                        <TableCell>{item.id}</TableCell>
                        <TableCell style={{width: '70%'}}>{item.Item}</TableCell>
                        <TableCell>{item.Valor}</TableCell>
                        <TableCell>{item.Tamanho}</TableCell>
                     <Button 
                                variant="outlined" 
                                color="secondary" 
                                size="small" 
                                onClick={() => apagar(item.id)}>
                                    <DeleteIcon/> Excluir
                     </Button>  
                     </TableRow>   
                ))
            }
        </Table>
        <Button 
            onClick={openDialog}
            variant="contained" 
            color="secondary">
                Adicionar
        </Button>

        <Dialog open={open} onClose={closeDialog}>
            <DialogTitle>Novo Produto</DialogTitle>
            <DialogContent>
                <DialogContentText>Preencha os dados para cadastrar um novo produto.</DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="Item"
                    label="Item"
                    type="text"
                    fullWidth
                    value={item}
                    onChange={e => setItem(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="Valor"
                    label="Valor"
                    type="number"
                    fullWidth
                    value={Valor}
                    onChange={e => setValor(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="Tamanho"
                    label="Tamanho"
                    type="text"
                    fullWidth
                    value={Tamanho}
                    onChange={e => setTamanho(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog}>Cancelar</Button>
                <Button onClick={salvar}>Salvar</Button>
            </DialogActions>
        </Dialog>

        
    </>
}

export default ListaPage;