import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Popper from '@material-ui/core/Popper';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import axios from 'axios';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';

import styles from '../styles/navbar.module.scss'
import { useState } from 'react'

const useStyles = makeStyles((theme) => ({
    textField: {
        color: 'white',
        backgroundColor: 'black',
        borderRadius: '5px',
        paddingLeft: '10px',
        height: '80%'
    },

    label:{
        color:'white'

    },
    focused:{
        color:'white'
    }
}));




const NavBar = ({ username }) => {
    const classes = useStyles();
    const [display, setDisplay] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const [signedIn, setSignIn] = useState(false);


    const toggleDisplay = () => {
        if (display) {
            setDisplay(false)
            console.log(display)
        }
        else {
            setDisplay(true)
            console.log(display)
        }
    }

    const handlePopper = (e) => {
        setAnchorEl(anchorEl ? null : e.currentTarget);
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;




    return (
        <div className={styles.nav}>
            <MenuIcon className={styles.menuIcon} onClick={toggleDisplay} />
            <div className={styles.logo}></div>


            <div className={styles.searchBar}>

            <Autocomplete 
                    className={classes.textField}
                    style={{width: '100%'}}
                    freeSolo
                    options={top100Films.map((option) => option.title)}
                    renderInput={(params) => (

                        <TextField
                            {...params}
                            fullWidth label='Type below to browse stocks'
                            InputProps={{
                                ...params.InputProps,
                                type:'search',
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon style={{ color: 'white' }} />
                                    </InputAdornment>
                                ),
                            }}
                            InputLabelProps ={{
                                classes: {
                                    root: classes.label,
                                    focused: classes.focused
                                }
                            }}
                        />

                    )}
                />

            </div>


            <ul className={`${styles.subMenu} ${display ? styles.active : ''}`}>
                <li> <Link href='/'><HomeRoundedIcon fontSize="small" /></Link>Home </li>
                <li> <WorkRoundedIcon fontSize="small" /> Portfolios</li>
                <li> <PersonRoundedIcon fontSize="small" /> Profile</li>
            </ul>
            <ul className={styles.menuTablet}>
                <li> <Link href='/'><HomeRoundedIcon fontSize="large" /></Link> </li>
                <li> <Link href='/portfolios'><WorkRoundedIcon fontSize="large" /></Link> </li>
                <li> <PersonRoundedIcon onClick={handlePopper} fontSize="large" /> </li>
            </ul>

            <Popper id={id} open={open} anchorEl={anchorEl}>
                <div style={{ marginTop: '10px', padding: '10px', textAlign: 'center', backgroundColor: 'red' }}>
                    {username ? username : 'Plz sign in'}
                </div>
            </Popper>
        </div>
    )
}


const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 }
]

export default NavBar