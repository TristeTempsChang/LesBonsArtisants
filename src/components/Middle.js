import '../styles/Middle.css';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const ColorButton = styled(Button)({
    color: 'red',
    borderColor: 'red',
    padding: '16px 30px',
    fontWeight: '700',
    fontSize: '15px',
    fontFamily: 'Quicksand',
    '&:hover': {
      color: '#FFFFFF',
      backgroundColor: 'red',
      borderColor: 'red'
    },
});

function Middle(){
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4200/api/product')
          .then(response => {
            const filteredData = response.data.data.filter((product, index) => {
                return product.available === true && index < 4;
              });
            setData(filteredData);
          })
          .catch(error => {
            console.error(error);
          });
      }, []);

    return (
        <div>
            <br />
            <h2 className='title'>Produits actuellement en stock</h2>
            <br />
            <div className='ensemble'>
                {data.map(product => (
                    <div key={product._id}>
                        <Card className='border' sx={{ maxWidth: 345 }}>
                            <div className="cardMediaContainer">
                                <CardMedia
                                    sx={{ height: 200, width: 200 }}
                                    image='https://aws-obg-image-lb-2.tcl.com/content/dam/brandsite/region/global/products/smartphones/category-display/tcl40r5g-pc.png'
                                />
                            </div>
                            <CardContent>
                                <Typography className='cardPhone' gutterBottom variant="h5" component="div">
                                {product.name}
                                </Typography>
                                <div className="info">
                                    <p>Type : {product.type}</p>
                                    <p>{product.price + ' €'}</p>
                                </div>
                                <div className='rating'>
                                    <Rating className='ratingInside' name="read-only" Value={product.rating} readOnly />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
            <br />
            <br />
            <div className="buttonContainer">
            <Link to='/home'><ColorButton variant="outlined">Voir plus</ColorButton></Link>
            </div>
            <br />
            <br />
        </div>
    )
}

export default Middle