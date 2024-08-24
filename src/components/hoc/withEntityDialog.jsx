import { forwardRef, useImperativeHandle, useState } from "react"
import CloseIcon from '@mui/icons-material/Close'
import { Box, Dialog, Typography, IconButton, useMediaQuery, useTheme } from "@mui/material"

export default function withEntityDialog(WrappedComponent) {
    const InnerComponent = forwardRef(({ customClose, maxWidth, title, ...props }, ref) => {
        const [open, setOpen] = useState(false)
        const [entity, setEntity] = useState({})
        const theme = useTheme()
        const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

        const onClose = () => setOpen(false)

        const openWithEntity = entity => {
            setOpen(true)
            setEntity(entity)
        }

        useImperativeHandle(ref, () => ({
            openWithEntity,
            close: onClose
        }))

        return (
            <Dialog
                open={open}
                onClose={customClose ?? onClose}
                fullWidth
                maxWidth={maxWidth}
                id="dialog-portal"
                fullScreen={fullScreen}
            >
                <Box p={3} borderRadius={12}>
                    <Box display="flex" justifyContent={title ? 'space-between' : 'flex-end'} alignItems="center">
                        {title && <Typography fontSize="22px" fontWeight="500">{title}</Typography>}
                        <IconButton onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <WrappedComponent open={open} setEntity={setEntity} onClose={onClose} entity={entity} {...props} />
                </Box>
            </Dialog>
        )
    })
    InnerComponent.displayName = `${WrappedComponent?.displayName}-hocwrapper`
    return InnerComponent
}