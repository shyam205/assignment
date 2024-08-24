import { Box, Tab, Tabs, styled } from "@mui/material";

export function TabPanel(props) {
    const { children, value, index, sx, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 4, ...sx }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

export const StyledTabs = styled(Tabs)(({ theme }) => ({
    paddingLeft: theme.spacing(2),
    "& .MuiTabs-indicator": {
        width: "30px !important",
    }
}))

export const StyledTab = styled(Tab)(
    () => ({
        minWidth: 60,
        paddingLeft: 0,
        textTransform: "none",
        textAlign: "left",
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "row",
    }),
)