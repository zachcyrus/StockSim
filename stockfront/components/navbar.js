import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import styles from '../styles/navbar.module.scss'

const NavBar = () => {
    return (
        <div className = 'nav'>
            <MenuIcon/>
            <div className = 'search-bar'>
                <SearchIcon/>
                <input type="text" placeholder="Browse stocks/companies"></input>

            </div>

        </div>
    )
}