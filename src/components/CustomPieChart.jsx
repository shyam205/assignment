import { Box, Typography } from '@mui/material';
import React, { useCallback, useRef } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteConfirmationPopup from './deleteConfirmation';
import useDashboardStore from '../store/masterData';
import { toast } from 'react-toastify';

const renderTotalLabel = (total) => ({ cx, cy }) => {
  return (
    <>
      <text
        x={cx}
        y={cy - 10}
        fill="black"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="18px"
        fontWeight="normal"
      >
        Total
      </text>
      <text
        x={cx}
        y={cy + 20}
        fill="black"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="24px"
        fontWeight="bold"
      >
        {total}
      </text>
    </>
  );
};

const renderCustomizedLegend = (value, entry) => {
    return `${value} (${entry?.payload?.value})`;
};

const CustomPieChart = ({ datas, title, category, handleRemoveSeach, searchdel }) => {
    const deleteRef = useRef();
    const removeWidget = useDashboardStore(state => state.removeWidget)
    const totalVal = datas?.data?.reduce((acc, segment) => acc + segment.value, 0);
    const handleDelete = async(entity) => {
        removeWidget(entity)
        if(!!searchdel){
            setTimeout(() => {
                handleRemoveSeach()
            }, 2000)
        } 
        toast('Widget Removed Successfully');
    }
    const handleDeletePress = useCallback((data) =>  deleteRef.current?.openWithEntity(data), [])
    
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', backgroundColor: '#fff' }}>
            <Box display='flex' justifyContent='space-between'>
                {datas?.sub_title && <Typography fontWeight="bold" sx={{ p: 1 }}>{datas?.sub_title}</Typography>}
                <Box mt={1} mr={1} onClick={() => handleDeletePress({id: datas?.id, category: category})}><DeleteIcon style={{ color: '#8884d8', cursor: 'pointer' }} /></Box>
            </Box>
            <Box display='flex' flexDirection='column' sx={{ overflowX: 'scroll' }}>
                <PieChart width={400} height={250} style={{ marginTop: '4px', marginRight: '4px' }}>
                    <Pie
                    data={datas?.data}
                    cx="50%" // Center horizontally
                    cy="50%" // Center vertically
                    outerRadius={90} // Slightly reduce outer radius
                    innerRadius={50} // Inner radius for hollow effect
                    startAngle={90} // Adjust starting angle if necessary
                    endAngle={450} // Ensure the full circle is shown
                    dataKey="value"
                    label={renderTotalLabel(totalVal)}
                    labelLine={false} // Remove the outer line
                    >
                    {datas?.data?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                    iconType="square"
                    formatter={renderCustomizedLegend}
                    />
                </PieChart>
            </Box>
            <DeleteConfirmationPopup
                deleteAction={handleDelete}
                warningText = "Are you sure you want to delete this?"
                warningDescription = "This may impact the business operation."
                ref={deleteRef}
            />
        </div>
    );
};

export default CustomPieChart;
