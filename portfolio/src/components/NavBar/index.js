import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Tabs, Tab, Typography, Box, makeStyles } from '@material-ui/core/';

import './style.css';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`wrapped-tabpanel-${index}`}
        aria-labelledby={`wrapped-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
}));

function a11yProps(index) {
    return {
      id: `wrapped-tab-${index}`,
      'aria-controls': `wrapped-tabpanel-${index}`,
    };
}

function NavBar() {
    const classes = useStyles();
    const [value, setValue] = React.useState('one');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <AppBar id="navbar" position="static">
                <Tabs id="navbar-links" value={value} onChange={handleChange} TabIndicatorProps={{style: {background:'white'}}} textColor="white">
                    <Tab value="Home" label="Home" wrapped {...a11yProps('Home')}></Tab>
                    <Tab value="About" label="About" {...a11yProps('About')}></Tab>
                    <Tab value="Resume" label="Resume" {...a11yProps('Resume')}></Tab>
                    <Tab value="Works" label="Works" {...a11yProps('Works')}></Tab>
                    <Tab value="Contact" label="Contact" {...a11yProps('Contact')}></Tab>
                </Tabs>
            </AppBar>
            <TabPanel value={value} index="Home">
                <div id="Home">
                    <div class="presentation">
                        <h1>I am Vitor Forbrig</h1>
                    </div>
                    <div id="portrait">
                        <img alt="" width="80" height="80" src="https://avatars2.githubusercontent.com/u/11168606?s=460&amp;v=4"></img>
                    </div>
                </div>
            </TabPanel>
            <TabPanel value={value} index="About">
                Item Two
            </TabPanel>
            <TabPanel value={value} index="Resume">
                Item Three
            </TabPanel>
            <TabPanel value={value} index="Works">
                Item Three
            </TabPanel>
            <TabPanel value={value} index="Contact">
                Item Three
            </TabPanel>
        </div>
    );
}

export default NavBar;
