import React from 'react'
import Stack from '@mui/material/Stack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function Categories(props) {

    // color="secondary"
    const getButtons = () => {
        return <>
            <Tabs
                value={props.currentCategoryId}
                onChange={(event, value) => handleButtonClick(value)}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="categories"
            >
                <Tab label="All 🍛" value={-1} />
                {props.categories.map((category) => {
                    return (
                        <Tab label={category.name} value={category.id} key={category.id}/>
                    );
                })}
            </Tabs>
        </>;
    }

    const handleButtonClick = (categoryIdIn) => {
        console.log(`----`,categoryIdIn);
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
