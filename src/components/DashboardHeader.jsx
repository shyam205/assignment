import { Box, Button, Menu, MenuItem, Typography } from '@mui/material'
import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
//import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function DashboardHeader({ handleClickAddWidget }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handelAddWidget = () => {
        handleClickAddWidget();
    }
  return (
    <Box mt={2} display='flex' justifyContent='space-between' alignItems='center' sx={{ flexDirection: {xs: 'column-reverse', sm: 'row'} }}>
        <Box sx={{ width: {xs: '100%', sm: 'max-content'}, mb: {xs: 3, sm: 0} }}>
            <Typography fontWeight="bold">CNAPP Dashboard</Typography>
        </Box>
        <Box display='flex' justifyContent='space-between' alignItems='center' columnGap={2} sx={{ mb: {xs: 2, sm: 0}, width: {xs: '100%', sm: 'max-content'}  }}>
            <Button sx={{ p: 1, border: '1px solid gray' }} onClick={handelAddWidget}>
                <Typography variant='paragraph'>Add Widget</Typography>
                <AddIcon />
            </Button>
            <Button sx={{ p: 1, border: '1px solid gray' }}>
                <AutorenewIcon />
            </Button>
            <Button sx={{ p: 1, border: '1px solid gray', display: {xs: 'none', sm: 'block'} }}>
                <MoreVertIcon />
            </Button>
            <Button sx={{ p: 1, border: '1px solid gray', display: {xs: 'none', sm: 'block'} }} >
                <WatchLaterIcon />
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    endIcon={<KeyboardArrowDownIcon />}
                >
                    2 days
                </Button>
                <Menu
                    elevation={0}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    id="demo-customized-menu"
                    MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose} disableRipple>
                        3 days
                    </MenuItem>
                    <MenuItem onClick={handleClose} disableRipple>
                        4 days
                    </MenuItem>
                    <MenuItem onClick={handleClose} disableRipple>
                        5 days
                    </MenuItem>
                    <MenuItem onClick={handleClose} disableRipple>
                        6 days
                    </MenuItem>
                </Menu>
            </Button>
        </Box>
    </Box>
  )
}

export default DashboardHeader