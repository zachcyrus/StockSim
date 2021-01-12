import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';


import styles from '../styles/navbar.module.scss'
import {useState} from 'react'

const NavBar = () => {
    const [display, setDisplay] = useState(true)

    const toggleDisplay = () =>{
        if(display){
            setDisplay(false)
            console.log(display)
        }
        else{
            setDisplay(true)
            console.log(display)
        }
    }


    return (
        <div className={styles.nav}>
            <MenuIcon onClick = {toggleDisplay} />
            <div className={styles.searchBar}>
                <SearchIcon fontSize="small" />
                <input type="text" placeholder="Browse stocks/companies"></input>
            </div>
            <ul  className={`${styles.subMenu} ${display ? styles.active : ''}`}>
                <li>Home</li>
                <li>Portfolios</li>
                <li>Profile</li>
            </ul>
        </div>
    )
}

export default NavBar