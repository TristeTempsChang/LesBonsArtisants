import '../styles/ActionPage.css';
import logo from '../media/lesbonsartisansdef.png';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DialogContentText from '@mui/material/DialogContentText';
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import {Checkbox, FormControlLabel} from '@mui/material';

const ColorButton = styled(Button)({
    color: '#1b2150',
    borderColor: '#1b2150',
    padding: '16px 26px',
    fontWeight: '700',
    fontSize: '12px',
    fontFamily: 'Quicksand',
    '&:hover': {
      color: '#FFFFFF',
      backgroundColor: '#1b2150',
      borderColor: '#1b2150'
    },
});

function ActionPage(){
    const [data, setData] = useState([]);
    const [productData, setProductData] = useState(null);
    const [prodId, setProdId] = useState('');

    useEffect(() => {
        axios.get('http://localhost:4200/api/product')
          .then(response => {
            setData(response.data.data);
          })
          .catch(error => {
            console.error(error);
          });
      }, []);

      const [open, setOpen] = React.useState(false);
      const [open2, setOpen2] = React.useState(false);
      const [open3, setOpen3] = React.useState(false);
      const [open4, setOpen4] = React.useState(false);

        const handleClickOpen = () => {
            setOpen(true);
        };

        const handleClickOpen2 = (productId) => {
            setProdId(productId);
            setOpen2(true);
        };
        
        const handleClickOpen3 = (productId) => {
            setProdId(productId);
            setOpen3(true);
        };

        const handleClickOpen4 = (productId) => {
            fetchProductData(productId);
            setOpen4(true);
        };

        const handleClose = () => {
            setOpen(false);
        };

        const handleClose2 = () => {
            setOpen2(false);
        };

        const handleClose3 = () => {
            setOpen3(false);
        };

        const handleClose4 = (productId) => {
            setOpen4(false);
        };

        const [formValues, setFormValues] = useState({
            name: '',
            type: '',
            price: '',
            rating: '',
            warranty: '',
            available: false,
          });

          const fetchProductData = (productId) => {
            axios
              .get(`http://localhost:4200/api/productById/${productId}`)
              .then((response) => {
                const product = response.data.data;
                setProductData(product);
              })
              .catch((error) => {
                console.error(error);
              });
          };

        const handleFormChange = (event) => {
            const { name, value, type, checked } = event.target;
            const fieldValue = type === 'checkbox' ? checked : value;
        
            setFormValues((prevFormValues) => ({
              ...prevFormValues,
              [name]: fieldValue,
            }));
          };

          const handleFormSubmit = () => {
            const { name, type, price, rating, warranty_years, available } = formValues;
          
            axios
              .post('http://localhost:4200/api/product', {
                name,
                type,
                price,
                rating,
                warranty_years: warranty_years,
                available,
              })
              .then((response) => {
                const savedProd = response.data.data;
                console.log(savedProd);
                window.location.reload();
                handleClose();
              })
              .catch((error) => {
                console.error(error);
              });
          };

          const handleDeleteProduct = () => {
            const productId = prodId;
          
            axios
              .delete(`http://localhost:4200/api/productById/${productId}`)
              .then((response) => {
                console.log(response.data.message);
                window.location.reload();
                handleClose3();
              })
              .catch((error) => {
                console.error(error);
              });
          };

          const handleUpdateProduct = () => {
            const updatedProductId = prodId;
          
            axios
              .post(`http://localhost:4200/api/productById/${updatedProductId}`, formValues)
              .then((response) => {
                const updatedProduct = response.data.data;
                console.log(updatedProduct);
                window.location.reload();
                handleClose2();
              })
              .catch((error) => {
                console.error(error);
              });
          };

    return(
        <div>
            <div className='lmj-banner'>
                <img src={logo} alt="logo" className='lmj-logo'/>
                <div className='banner-title'>
                    <Avatar className='icon'>
                        <PersonIcon />
                    </Avatar>
                        <p>Compte User</p>
                </div>
            </div>
            <div className='liste'>
                <h2>Liste des produits</h2>
                {data.map(product => (
                    <List
                    sx={{
                        width: '100%',
                        maxWidth: 360,
                        bgcolor: 'background.paper',
                        position: 'relative',
                        overflow: 'auto',
                        maxHeight: 300,
                        '& ul': { padding: 0 },
                    }}
                    subheader={<li />}
                    >
                        <li>
                            <ul className='product'>
                                <ListItem key={product._id}>
                                    <ListItemText className='nameProd' onClick={() => handleClickOpen4(product._id)} primary={product.name} />
                                    <div className='Product'>
                                        <IconButton onClick={() => handleClickOpen3(product._id)} aria-label="comment">
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton onClick={() =>handleClickOpen2(product._id)} aria-label="comment">
                                            <ModeEditIcon />
                                        </IconButton>
                                    </div>
                                </ListItem>
                            </ul>
                        </li>
                    </List>
                ))}
            </div>
            <ColorButton className='btn' variant="outlined" onClick={handleClickOpen} startIcon={<AddIcon />}>Ajouter un produit</ColorButton>
            <div className='lmj-footer'>
                <p className='textFooter'>© 2023, Les Bons Artisans - Tous droits réservés</p>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Ajouter un nouveau produit</DialogTitle>
                <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Nom du produit"
                    type="text"
                    name='name'
                    fullWidth
                    variant="standard"
                    value={formValues.name}
                    onChange={handleFormChange}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="type"
                    label="Type"
                    type="text"
                    name='type'
                    fullWidth
                    variant="standard"
                    value={formValues.type}
                    onChange={handleFormChange}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="price"
                    label="Prix"
                    name='price'
                    type="number"
                    fullWidth
                    variant="standard"
                    value={formValues.price}
                    onChange={handleFormChange}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="rating"
                    name='rating'
                    label="Note"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={formValues.rating}
                    onChange={handleFormChange}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="warranty"
                    name='warranty_years'
                    label="Année de garantie"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={formValues.warranty_years}
                    onChange={handleFormChange}
                />
                <FormControlLabel
                control={<Checkbox />}
                label="Disponible"
                id="available"
                name='available'
                checked={formValues.available}
                onChange={handleFormChange}
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Annuler</Button>
                <Button onClick={handleFormSubmit}>Ajouter</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={open2} onClose={handleClose2}>
                <DialogTitle>Modifier le produit</DialogTitle>
                <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    name="name"
                    label="Nom du produit"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={formValues.name}
                    onChange={handleFormChange}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="type"
                    name="type"
                    label="Type de produit"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={formValues.type}
                    onChange={handleFormChange}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="price"
                    name="price"
                    label="Prix"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={formValues.price}
                    onChange={handleFormChange}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="rating"
                    name="rating"
                    label="Note"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={formValues.rating}
                    onChange={handleFormChange}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="warranty"
                    name="warranty"
                    label="Année de garantie"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={formValues.warranty}
                    onChange={handleFormChange}
                />
                <FormControlLabel
                control={<Checkbox />}
                label="Disponible"
                id="available"
                name='available'
                checked={formValues.available}
                onChange={handleFormChange}
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose2}>Annuler</Button>
                <Button onClick={handleUpdateProduct}>Modifier</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={open3} onClose={handleClose3}>
                <DialogTitle>Suppression du produit</DialogTitle>
                <DialogContent>
                <DialogContentText>
                Êtes-vous sûr de votre choix ? Une fois supprimé, l'article disparaîtra définitivement...
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose3}>Non</Button>
                <Button onClick={handleDeleteProduct}>Oui</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={open4} onClose={handleClose4}>
            {productData && (
                <>
                <img
                    src="https://aws-obg-image-lb-2.tcl.com/content/dam/brandsite/region/global/products/smartphones/category-display/tcl40r5g-pc.png"
                    alt="uneImage"
                />
                <DialogContent>
                    <DialogContentText>
                    Nom du produit : {productData.name}
                    <br />
                    Type : {productData.type}
                    <br />
                    Prix : {productData.price}
                    <br />
                    Note : {productData.rating}
                    <br />
                    Année de garantie : {productData.warranty_years}
                    <br />
                    Disponible : {productData.available}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose4}>Ok</Button>
                </DialogActions>
                </>
            )}
            </Dialog>               
        </div>
    )
}

export default ActionPage