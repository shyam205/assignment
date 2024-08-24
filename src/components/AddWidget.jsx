import { Box, Button, Checkbox, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { StyledTab, StyledTabs, TabPanel } from './CustomTabs';
import useDashboardStore from '../store/masterData';
import { toast } from 'react-toastify';

function AddWidget({ handleCloseAddWidget, categoryNumber }) {
    const dashboardData = useDashboardStore(state => state.dashboardData)
    const updateDashboardCategory = useDashboardStore(state => state.updateDashboardCategory)
    const [value, setValue] = useState(categoryNumber || 0);
    const [selectefCategory, setSelectedCategory] = useState('CSPM Executive Dashboard')

    let modifiedWidget = dashboardData[selectefCategory];
    const handleChange = (event,newValue) => {
        setValue(newValue);
    };
    
    const handleCloseWidget = () => {
        handleCloseAddWidget()
    }
    const handleChangeAvailibilty = (data, id, checked) => {
        
        let updatedWidget = {...data, available: checked}
        let modifiednewWidget = modifiedWidget?.maindata?.filter((item) => item.id !== id)

        modifiedWidget = {
            maindata: [...modifiednewWidget, updatedWidget], 
        }
        
    }
    const handleConfirm = () => {
        updateDashboardCategory(modifiedWidget, selectefCategory)
        handleCloseAddWidget();
        toast('Widget Updated Successfully');
    }

    const handleCancel = () => {
        handleCloseAddWidget();
    }

    useEffect(() => {
            if(value === 0){
                setSelectedCategory('CSPM Executive Dashboard')
            }
            else if(value === 1){
                setSelectedCategory('CWPP DASHBOARD') 
            }
            else{
                setSelectedCategory('Registry Scan') 
            }
    }, [value])

    return (
        <Box sx={{ width: '500px', height: '100vh' }}>
            <Box sx={{ backgroundColor: '#35189e', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} p={1}>
                <Typography color="white">Add Widget</Typography>
                <CloseIcon sx={{ color: '#fff', cursor: 'pointer' }} onClick={handleCloseWidget} />
            </Box>
            <Typography p={1}>Personalise your dashboard by adding the follwing Widget</Typography>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <StyledTabs value={value} onChange={handleChange}>
                    <StyledTab label="CSPM" />
                    <StyledTab label="CWPP" />
                    <StyledTab label="Images" />
                    <StyledTab label="Tickets" />
                </StyledTabs>
            </Box>
            <TabPanel value={value} index={0}>
                {Object.keys(dashboardData).length > 0 && dashboardData['CSPM Executive Dashboard']?.maindata?.map((data, index) => (
                    <Box key={index} border="1px solid #eee" display='flex' justifyContent='left' alignItems='center' columnGap={1}>
                        <Checkbox
                            defaultChecked={data?.available}
                            onChange={(e) => handleChangeAvailibilty(data, data?.id, e.target.checked )}
                        />
                        <Typography fontWeight="bold">{data?.sub_title}</Typography>
                    </Box>
                ))}
                <Box position='absolute' bottom={100} right={50} display='flex' columnGap={3}>
                    <Button variant="outlined" sx={{ border: '1px solid #35189e', color: '#35189e' }} onClick={handleCancel}>Cancel</Button>
                    <Button variant="contained" sx={{ backgroundColor: "#35189e" }} onClick={handleConfirm}>Confirm</Button>
                </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
                {Object.keys(dashboardData).length > 0 && dashboardData['CWPP DASHBOARD']?.maindata?.map((data, index) => (
                    <Box key={index} border="1px solid #eee" display='flex' justifyContent='left' alignItems='center' columnGap={1}>
                        <Checkbox
                            defaultChecked={data?.available}
                            onChange={(e) => handleChangeAvailibilty(data, data?.id, e.target.checked )}
                        />
                        <Typography fontWeight="bold">{data?.sub_title}</Typography>
                    </Box>
                ))}
                <Box position='absolute' bottom={100} right={50} display='flex' columnGap={3}>
                    <Button variant="outlined" sx={{ border: '1px solid #35189e', color: '#35189e' }} onClick={handleCancel}>Cancel</Button>
                    <Button variant="contained" sx={{ backgroundColor: "#35189e" }} onClick={handleConfirm}>Confirm</Button>
                </Box>
            </TabPanel>
            <TabPanel value={value} index={2}>
                {Object.keys(dashboardData).length > 0 && dashboardData['Registry Scan']?.maindata?.map((data, index) => (
                    <Box key={index} border="1px solid #eee" display='flex' justifyContent='left' alignItems='center' columnGap={1}>
                        <Checkbox
                             defaultChecked={data?.available}
                             onChange={(e) => handleChangeAvailibilty(data, data?.id, e.target.checked )}
                        />
                        <Typography fontWeight="bold">{data?.sub_title}</Typography>
                    </Box>
                ))}
                <Box position='absolute' bottom={100} right={50} display='flex' columnGap={3}>
                    <Button variant="outlined" sx={{ border: '1px solid #35189e', color: '#35189e' }} onClick={handleCancel}>Cancel</Button>
                    <Button variant="contained" sx={{ backgroundColor: "#35189e" }} onClick={handleConfirm}>Confirm</Button>
                </Box>
            </TabPanel>
        </Box>
    )
}

export default AddWidget