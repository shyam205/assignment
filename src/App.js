import { Button, Drawer, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useCallback, useRef, useState } from 'react';
import './App.css';
import CustomPieChart from './components/CustomPieChart';
import DashboardHeader from './components/DashboardHeader';
import TopBar from './components/TopBar';
import AddWidget from './components/AddWidget';
import ProgressBar from './components/ProgressBar'
import DeleteIcon from '@mui/icons-material/Delete';
import useDashboardStore from './store/masterData';
import DeleteConfirmationPopup from './components/deleteConfirmation';
import { toast } from 'react-toastify';

// const allData = {
//     cspm : {
//         maindata:  [
//             {
//                 'totalValue': 2,
//                 'sub_title': 'Cloud Accounts',
//                 'chart_type': 'pie',
//                 'data': [
//                     { name: 'Connected', value: 2, color: '#8884d8' },
//                     { name: 'Not Connected', value: 2, color: '#d8d8d8' },
//                 ]
//             },
//             {
//                 'totalValue': 2,
//                 'sub_title': 'Cloud Account Risk Assesment',
//                 'chart_type': 'pie',
//                 'data': [
//                     { name: 'Failed', value: 1689, color: '#FF0000' },
//                     { name: 'Warning', value: 681, color: '#FFD700' },
//                     { name: 'Not available', value: 36, color: '#CCCCCC' },
//                     { name: 'Passed', value: 7253, color: '#008000' },
//                 ]
//             }
//         ],
//         alias: 'CSPM Executive Dashboard'
//     },
//     cwpp : {
//         maindata:  [
//             {
//                 'sub_title': 'Top 5 Namespace Specific Alerts',
//                 'chart_type': 'pie',
//                 data: [],
//             },
//             {
//                 'sub_title': 'Workload Alerts',
//                 'chart_type': 'pie',
//                 data: [],
//             },
//         ]
//     },
//     registry_scan: {
//         maindata : [
//             {
//                 'sub_title': 'Image Risk Assessment',
//                 'sub_info': 'vulnerability',
//                 'chart_type': 'progress',
//                 data: [
//                     { name: 'Critical', value: 9, color: '#d32f2f' }, // Red
//                     { name: 'High', value: 50, color: '#f57c00' }, // Orange
//                     { name: 'Medium', value: 30, color: '#ffca28' }, // Yellow
//                     { name: 'Low', value: 10, color: '#bdbdbd' }, // Grey
//                 ]  
//             },
//             {
//                 'sub_title': 'Image Security Issue',
//                 'sub_info': 'Images',
//                 'chart_type': 'progress',
//                 data: [
//                     { name: 'Critical', value: 19, color: '#d32f2f' }, // Red
//                     { name: 'High', value: 15, color: '#f57c00' }, // Orange
//                     { name: 'Medium', value: 40, color: '#ffca28' }, // Yellow
//                     { name: 'Low', value: 11, color: '#bdbdbd' }, // Grey
//                 ]  
//             },
//             {
               
//             }
//         ]
//     }
// }


function App() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [widgetData, setWidgetData] = useState([]); 
    const [search, setSearch] = useState('');
    const [categoryNumber, setCategoryNumber] = useState(0)
    const deleteRef = useRef();
    const dashboardData = useDashboardStore(state => state.dashboardData)
    const removeWidget = useDashboardStore(state => state.removeWidget)
    let dashboardCatagories = Object.keys(dashboardData)
    let dashboardCatagoriesdata = Object.values(dashboardData)

    const handleDelete = async(entity) => {
        removeWidget(entity)
        toast('Widget Deleted Successfully');
    }
    const handleDeletePress = useCallback((id, dashboardCategory) =>  {
        deleteRef.current?.openWithEntity({id: id, category: dashboardCategory})
    }, [])

    const toggleDrawer = (open, index) => (event) => {
        if (
          event.type === 'keydown' &&
          (event.key === 'Tab' || event.key === 'Shift')
        ) {
          return;
        }
        setIsDrawerOpen(open);
        setCategoryNumber(index)
    };

    const handleClickAddWidget = () => {
        setIsDrawerOpen(true)
    }

    const handleCloseAddWidget = () => {
        setIsDrawerOpen(false)
    }

    const handleSearch = (val) => {
        setSearch(val)
        setWidgetData(Object.values(dashboardData).length > 0 && Object.values(dashboardData)?.map((x) => x.maindata).flat(Infinity)?.filter((item) => item?.sub_title?.match(new RegExp(`${val}`, 'gi'))))
    }

    const handleRemoveSeach = () => {
        setSearch('')
    }
    return (
        <div className="App">
            <div>
                <Box sx={{ px: {xs: 2, sm: 5}, backgroundColor: '#eff2ff', pb: 5 }}>
                    <TopBar handleSearch={(val) => handleSearch(val)} search={search} />
                    <DashboardHeader handleClickAddWidget={handleClickAddWidget} />
                    {
                      search?.length === 0 && (
                        <>
                           {
                            dashboardCatagoriesdata?.map((data, index) => (
                                <Box key={index} mb={3}>
                                    <Typography mb={1} fontWeight="bold">{dashboardCatagories[index]}</Typography>
                                    <Box display='flex' flexDirection="row" alignItems='center' flexWrap='wrap' rowGap={2} sx={{ justifyContent: {xs: 'center', md: 'left', lg: 'flex-start'} }}>
                                        {
                                            data?.maindata?.filter(item => item.available).map((data) => (
                                                <Box backgroundColor="#fff" height="290px" sx={{
                                                    overflow: 'hidden',
                                                    '&:hover': {
                                                        boxShadow: '0 10px 10px rgb(209, 209, 209)',
                                                        transition: '0.6s all ease-in-out'
                                                    },
                                                    width: {xs: '100%',sm: 'calc((100% - 80px)/3)'},
                                                    marginRight: {xs: 0,sm: '40px'},
                                                    '&:nth-child(3n+3)': {
                                                        marginRight: 0,
                                                    }
                                                }}>
                                                {
                                                    data?.sub_title &&
                                                    <Box>
                                                        {
                                                            data?.data?.length > 0 && data?.chart_type === 'pie' && <CustomPieChart datas={data} title={data?.sub_title} category={dashboardCatagories[index]} />
                                                        }
                                                        {
                                                           data?.data?.length > 0 && data?.chart_type === 'progress' && <ProgressBar datas={data} title={data?.sub_title} category={dashboardCatagories[index]} />
                                                        }
                                                        {data?.data?.length === 0 && data?.sub_title && 
                                                        <Box display='flex' justifyContent='space-between'>
                                                            <Typography fontWeight="bold" p={1}>{data?.sub_title}</Typography>
                                                            <Box mt={1} mr={1} onClick={() => handleDeletePress(data?.id, dashboardCatagories[index])}><DeleteIcon style={{ color: '#8884d8', cursor: 'pointer' }} /></Box>
                                                        </Box>
                                                        }
                                                        {data?.data?.length === 0 && (
                                                            <Box display='flex' flexDirection="column" justifyContent='center' alignItems='center' height="250px">
                                                                <img src="./default_graph.jpg" alt="" height="100px" />
                                                                <Typography>No Grapg Data Available!</Typography>
                                                            </Box>
                                                        )}
                                                    </Box> 
                                                }
                                                </Box> 
                                            ))
                                        }
                                        <Box backgroundColor="#fff" height="290px" display='flex' justifyContent='center' alignItems='center' sx={{ width: {xs: '100%',sm: 'calc((100% - 80px)/3)'} }}><Button sx={{ border: '1px solid #eee' }} onClick={(event) => toggleDrawer(true, index)(event)}>+ Add Widget</Button></Box>
                                    </Box>
                                </Box>
                            ))
                           } 
                        </>
                      )
                    }
                    {
                        search.length > 0 && widgetData?.length > 0 && (
                            <Box display='flex' flexDirection="row" justifyContent='left' flexWrap='wrap' rowGap={1} p={1} height="76vh">
                                {
                                    widgetData.map((data, index) => (
                                        <Box key={index} sx={{
                                            width: 'calc((100% - 80px)/3)',
                                            marginRight: '40px',
                                            '&:nth-child(3n+3)': {
                                                marginRight: 0,
                                            },
                                            position: "relative"
                                        }}>
                                      
                                            <Box height="290px">
                                                {data?.chart_type === 'progress' && <ProgressBar datas={data} title={data?.sub_title} text={data?.sub_info} category={data?.parent_category} handleRemoveSeach={handleRemoveSeach} searchdel={true} />}
                                                {data?.chart_type === 'pie' && <CustomPieChart datas={data} title={data?.sub_title} text={data?.sub_info} category={data?.parent_category} handleRemoveSeach={handleRemoveSeach} searchdel={true} />}
                                            </Box>
                                            {
                                                data?.data?.length === 0 && (
                                                    <Box display='flex' flexDirection="column" justifyContent='center' alignItems='center' height="250px" position='absolute' top='0' left='50%' sx={{ transform: 'translateX(-50%)' }}>
                                                        <img src="./default_graph.jpg" alt="" height="100px" />
                                                        <Typography>No Grapg Data Available!</Typography>
                                                    </Box>
                                                )
                                            }
                                        </Box>
                                    ))
                                }
                            </Box>  
                        )
                    }
                    {
                        search.length > 0 && widgetData?.length === 0 && (
                            <Box display='flex' flexDirection="row" justifyContent='left' flexWrap='wrap' columnGap={2} rowGap={1} p={1} height="76vh">
                                <Typography>Data Not Found</Typography>
                            </Box>  
                        )
                    }
                </Box>
                <Drawer
                    anchor="right"
                    open={isDrawerOpen}
                    onClose={toggleDrawer(false)}
                >
                    <Box>
                        <AddWidget handleCloseAddWidget={handleCloseAddWidget} categoryNumber={categoryNumber} />
                    </Box>
                </Drawer>
                <DeleteConfirmationPopup
                    deleteAction={handleDelete}
                    warningText = "Are you sure you want to delete this?"
                    warningDescription = "This may impact the business operation."
                    ref={deleteRef}
                />
            </div>
        </div>
    );
}

export default App;
