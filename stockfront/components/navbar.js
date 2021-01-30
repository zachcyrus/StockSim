import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import Popper from '@material-ui/core/Popper';

import Link from 'next/link'

import styles from '../styles/navbar.module.scss'
import { useState } from 'react'

const NavBar = () => {
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
                <SearchIcon fontSize="small" />
                <input type="text" placeholder="Browse stocks/companies"></input>
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
                    {signedIn ? 'You are signed in' : 'Plz sign in'}
                </div>
            </Popper>
        </div>
    )
}

export default NavBar