import React from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function Categories(props) {
    const getButtonVariant = (variantId) => {
        return variantId === props.currentCategoryId ? 'contained' : 'outlined';
    }
    const getButtons = () => {
        return <>
            <Button variant={getButtonVariant(0)} onClick={() => handleButtonClick(0)}>All</Button>
            {props.categories.map((category) => {
                return (
                    <Button variant={getButtonVariant(category.id)} onClick={() => handleButtonClick(category.id)}>
                        {category.name}
                    </Button>
                );
            })}
        </>;
    }

    const handleButtonClick = (categoryIdIn) => {
        props.buttonClickHandler(categoryIdIn);
    }

    return (
        props.categories ?
            <>
                <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
                    {getButtons()}
                </Stack>
            </> :
            <>else</>
    )
}
