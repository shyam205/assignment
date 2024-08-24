import withEntityDialog from "./hoc/withEntityDialog"
import { Box, Button, Typography } from "@mui/material"

const DeleteConfirmationPopup = withEntityDialog(function DeleteConfirmationPopup({
    warningText = "Are you sure you want to delete?",
    warningDescription = "",
    entity,
    deleteAction,
    onClose
}) {
    const handleDelete = async () => {
        await deleteAction(entity)
        onClose()
    }

    return (
        <Box>
            <Typography mb={2} textAlign="center" fontSize="20px">{warningText}</Typography>
            {!!warningDescription && <Typography mb={2.5} textAlign="center" variant="h6Medium">{warningDescription}</Typography>}
            <Box display="flex" justifyContent="flex-end" columnGap={1}>
                <Button variant="text" onClick={onClose}>Cancel</Button>
                <Button variant="gradient" onClick={handleDelete}>Yes, Delete it</Button>
            </Box>
        </Box>
    )
})

export default DeleteConfirmationPopup
