import React from 'react'
import './Menu.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';

export default function Menu(props) {
    const items = props.menuItems.filter((el) => {
        return el.category_id == props.currentCategoryId || props.currentCategoryId === -1
    });

    /** Returns Price HTML */
    const getPriceElement = (menuItem) => {
        // Supports 2 JSON structure  menuItem.price.amount and menuItem.price.amount. If not falls back to 'undefined'
        const itemPrice = menuItem.price && menuItem.price.amount ? menuItem.price.amount :
            menuItem.price ? menuItem.price : undefined;
        // Returns Price HTML if valid price is available if no price data is available empty string is returned
        return itemPrice ?
            <Box component="div" sx={{ mt: 2 }}>
                <Typography className="menu-item-price" variant="subtitle2">
                    ${itemPrice}
                </Typography>
            </Box> : ''
    }

    /** Returns Image DOM if valid Image data is present if not emptry string is returned */
    const getImageElement = (menuItem) => {
        const menuItemHasImage = menuItem.images && menuItem.images.length > 0;
        return menuItemHasImage ?
            <CardMedia
                component="img"
                height="240"
                image={menuItem.images[0]}
                alt="green iguana"
            /> : '';
    }

    const getShortDescription = (description) => {
        return description.substring(0, 70) + '...';
    }

    return (
        <div className='menu-grid-container'>
            {
                items.map((item) => {
                    return (
                        <div className='menu-grid-item' key={item.id}>
                            <Card sx={{ height: '100%' }}>
                                <CardActionArea>
                                    {getImageElement(item)}
                                    <CardContent>
                                        <Typography className='menu-item-title' gutterBottom variant="subtitle2" component="div">
                                            {item.name}
                                        </Typography>
                                        <Typography className='menu-item-description' gutterBottom variant="caption" component="div">
                                            {getShortDescription(item.description)}
                                        </Typography>
                                        {getPriceElement(item)}
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </div>
                    )
                })
            }
        </div>
    )
}
