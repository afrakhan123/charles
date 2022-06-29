import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

export const Header = () => {
    return <AppBar position="static">
        <Toolbar>
            <Typography variant="subtitle1">
                Utak Restaurant Tracker
            </Typography>
        </Toolbar>
    </AppBar>
}