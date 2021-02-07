import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Popper from '@material-ui/core/Popper';
import TextField from '@material-ui/core/TextField';

import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';


//for tomorrow work on navigating to a different page with search;

import styles from '../styles/navbar.module.scss'
import { useState } from 'react'

let tickerData = require('../assets/allTickers/allTickers.json')

tickerData = tickerData.slice(0, 10);

const useStyles = makeStyles({
    textInput: {
        color: 'white',
        backgroundColor: 'black',
        borderRadius: '5px',
        paddingLeft: '10px',
        height: '80%'
    },

    label: {
        color: 'white'

    },
    focused: {
        color: 'white'
    }
});




const NavBar = ({ username }) => {
    const classes = useStyles();
    const [display, setDisplay] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const [signedIn, setSignIn] = useState(false);
    const [search, setSearch] = useState('');

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

    const handleSubmit = (e) => {
        e.preventDefault()
        location.href=`/stock/${search.split(' ')[0]}`
        if (!search) {
            console.log('Search is empty')
        }
        else {
            console.log(`Fired submit: ${search.split(' ')[0]}`)

        }

    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;




    return (
        <div className={styles.nav}>
            <MenuIcon className={styles.menuIcon} onClick={toggleDisplay} />
            <div className={styles.logo}></div>


            <div className={styles.searchBar}>
                <SearchIcon style={{ color: 'white' }} />
                <form style={{ width: '100%' }} onSubmit={handleSubmit}>
                    <Autocomplete
                        className={classes.textInput}
                        style={{ width: '100%' }}

                        options={tickerData.map((ticker) => {
                            return ticker.ticker + ' ' + ticker.name
                        })
                        }
                        onChange={(event, value) => setSearch(value)}
                        renderInput={(params) => (

                            <TextField
                                {...params}
                                fullWidth 
                                label='Type below to browse stocks'
                                InputProps={{
                                    ...params.InputProps,
                                    type: 'search',

                                }}
                                InputLabelProps={{
                                    classes: {
                                        root: classes.label,
                                        focused: classes.focused
                                    }
                                }}
                                onInput={
                                    e => {
                                        setSearch(e.target.value)
                                    }
                                }
                            />

                        )}
                    />

                </form>
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
                    {username ? username : <Link href='/login'>Click to signin</Link>}
                </div>
            </Popper>
        </div>
    )
}


export default NavBar