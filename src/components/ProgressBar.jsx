import { Box, Typography } from '@mui/material';
import React, { useCallback, useRef } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteConfirmationPopup from './deleteConfirmation';
import useDashboardStore from '../store/masterData';
import { toast } from 'react-toastify';

const ProgressBar = ({ segments, total }) => {
  return (
    <div style={{ width: '100%', backgroundColor: '#e0e0df', borderRadius: '5px', overflow: 'hidden' }}>
      <div style={{ display: 'flex', height: '20px' }}>
        {segments?.map((segment, index) => (
          <div
            key={index}
            style={{
              width: `${(segment.value / total) * 100}%`,
              backgroundColor: segment.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '10px',
              whiteSpace: 'nowrap',
              padding: '0 5px',
            }}
          >
            {segment.value > 0 && <span>{segment.value}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

const DashboardRegistryScan = ({ datas, title, text, category, handleRemoveSeach, searchdel }) => {
    const deleteRef = useRef();
    const removeWidget = useDashboardStore(state => state.removeWidget)
    const total = datas?.data?.reduce((acc, segment) => acc + segment.value, 0);
    const handleDelete = async(entity) => {
        removeWidget(entity)
        if(!!searchdel){
            setTimeout(() => {
                handleRemoveSeach()
            }, 2000)
        } 
        toast('Remove Widget Successfully');
    }
    const handleDeletePress = useCallback((data) =>  deleteRef.current?.openWithEntity(data), [])   
    return (
        <Box style={{ padding: '20px', maxWidth: '500px', margin: 'auto', backgroundColor: '#fff', height: '210px' }}>
            <Box display='flex' justifyContent='space-between'>
                <Typography fontWeight="bold">{title}</Typography>
                <Box mt={1} mr={1} onClick={() => handleDeletePress({id: datas?.id, category: category})}><DeleteIcon style={{ color: '#8884d8', cursor: 'pointer' }} /></Box>
            </Box>
            <p style={{ fontSize: '24px', margin: '10px 0' }}>
                {total} <span style={{ fontSize: '16px', fontWeight: 'normal' }}>Total {text}</span>
            </p>
            <ProgressBar segments={datas?.data} total={total} />
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px', flexWrap: 'wrap' }}>
                {datas?.data?.length > 0 && datas?.data?.map((segment, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', width: '50%',  marginBottom: '15px' }}>
                    <div
                    style={{
                        width: '15px',
                        height: '15px',
                        backgroundColor: segment.color,
                        borderRadius: '50%',
                        marginRight: '5px',
                    }}
                    ></div>
                    <span>{segment.name} ({segment.value})</span>
                </div>
                ))}
            </div>
            <DeleteConfirmationPopup
                deleteAction={handleDelete}
                warningText = "Are you sure you want to delete this?"
                warningDescription = "This may impact the business operation."
                ref={deleteRef}
            />
        </Box>
    );
};

export default DashboardRegistryScan;
