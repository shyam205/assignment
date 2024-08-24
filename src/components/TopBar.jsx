import { Box, TextField, Typography } from '@mui/material'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';

const TopBar = ({ handleSearch, search }) => {
    let relativePath = ['Dashboard'];

    const handleChangeSearch = (val) => {
        handleSearch(val)
    }
    return (
        <Box display='flex' justifyContent='space-between' alignItems='center' pt={2} sx={{ flexDirection: {xs: 'column', sm: 'row'} }}>
            <Box display='flex' alignContent='center' justifyContent='space-between' width="max-content">
                <Box><Typography>Home</Typography></Box>
                {
                    relativePath.map((path, index) => (
                        <Box key={index} display='flex' alignContent='center' justifyContent='space-between'>
                            <Box><KeyboardArrowRightIcon /></Box>
                            <Typography fontWeight="bold">
                                {path}
                            </Typography>
                        </Box>
                    ))
                }
            </Box>
            <Box display='flex' justifyContent='space-between' alignItems='center' columnGap={2} sx={{ width: {xs: '100%', sm: '50%'} }}>
                <TextField 
                    fullWidth
                    label="Search anything" 
                    variant="outlined"
                    inputProps={{
                        sx: {
                            height: '25px',
                            padding: '5px 14px 20px 14px'
                        }
                    }}
                    value={search}
                    onChange={(e) => handleChangeSearch(e.target.value)}
                />
                <Box>
                    <NotificationsActiveOutlinedIcon />
                </Box>
            </Box>
        </Box>
    )
}

export default TopBar;