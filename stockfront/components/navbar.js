import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Popper from '@material-ui/core/Popper';
import TextField from '@material-ui/core/TextField';
import { useCookies } from 'react-cookie';
import axios from 'axios'
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';


//for tomorrow work on navigating to a different page with search;

import styles from '../styles/navbar.module.scss'
import React from "react";
import { List } from "react-virtualized";
import { useState } from 'react'

let tickerData = require('../assets/allTickers/allTickers.json')



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
    },
    popper: {
        marginTop: '10px',
        padding: '10px 0px 10px 0px',
        textAlign: 'center',
        backgroundColor: '#222222',
        color: 'white',
        width: '300px',
        fontSize: '24px'

    },
    loginLink:{
        "&:hover":{
            color:'blue'
        }
    }
});


const ListboxComponent = React.forwardRef(function ListboxComponent(
    props,
    ref
) {
    const { children, role, ...other } = props;
    const itemCount = Array.isArray(children) ? children.length : 0;
    const itemSize = 36;

    return (
        <div ref={ref}>
            <div {...other}>
                <List
                    height={250}
                    width={1}
                    rowHeight={itemSize}
                    overscanCount={5}
                    rowCount={itemCount}
                    rowRenderer={props => {
                        return React.cloneElement(children[props.index], {
                            style: props.style
                        });
                    }}
                    containerStyle={{
                        width: "100%",
                        maxWidth: "100%"
                    }}
                    style={{
                        width: "100%"
                    }}
                    role={role}
                />
            </div>
        </div>
    );
});


const NavBar = ({ username }) => {
    const classes = useStyles();
    const [display, setDisplay] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const [signedIn, setSignIn] = useState(false);
    const [search, setSearch] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies(['jwt'])

    const handleLogOut = async () => {
        if (confirm('Would you like to logout')) {
            try {
                let logOutUser = await axios
                    .get(`${process.env.NEXT_PUBLIC_APIURL}/auth/logout`,
                        { withCredentials: true })
                if (logOutUser.data.message) {
                    window.location.reload()
                }

            } catch (err) {
                console.log(err)

            }

        }
    }

    const toggleDisplay = () => {
        if (display) {
            setDisplay(false)
        }
        else {
            setDisplay(true)
        }
    }

    const handlePopper = (e) => {
        setAnchorEl(anchorEl ? null : e.currentTarget);
    }

    const handleSubmit = (e) => {
        e ? e.preventDefault(): ''
        console.log(search)
        location.href = `/stock/${search.split(' ')[0]}`
        if (!search) {
        }
        else {

        }

    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;




    return (
        <div className={styles.nav}>
            <MenuIcon className={styles.menuIcon} onClick={toggleDisplay} />
            <Link href='/'>
                <div className={styles.logo}>Logo</div>
            </Link>
            


            <div className={styles.searchBar}>
                <SearchIcon style={{ color: 'white' }} />
                <form style={{ width: '100%' }} onSubmit={handleSubmit}>
                    <Autocomplete
                        className={classes.textInput}
                        style={{ width: '100%' }}
                        ListboxComponent={ListboxComponent}
                        options={tickerData} 
                        getOptionLabel={(option) => option.ticker}
                        onChange={(event, value) => setSearch(value ? value.ticker : '')}
                        clearOnEscape={true}
                        renderOption={(option) => (
                            <React.Fragment>
                              <span
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  window.location.href = `/stock/${option.ticker}`;
                                }}
                              >
                                {option.ticker + ' ' + option.name}
                              </span>
                            </React.Fragment>
                          )}
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
                <li className={styles.mobileProfile}> <PersonRoundedIcon fontSize="small" />
                    {username ? <a style={{ marginTop: '0px', fontSize: '20px' }}>{username}
                        <button onClick={handleLogOut}>Click to logout</button></a> : <Link href='/login'>Click to signin</Link>}
                </li>
            </ul>
            <ul className={styles.menuTablet}>
                <li> <Link href='/'><HomeRoundedIcon fontSize="large" /></Link> </li>
                <li> <Link href='/portfolios'><WorkRoundedIcon fontSize="large" /></Link> </li>
                <li> <PersonRoundedIcon onClick={handlePopper} fontSize="large" /> </li>
            </ul>

            <Popper className={classes.popper} id={id} open={open} anchorEl={anchorEl}>
                <div className={classes.loginLink}>
                    {username ? <p style={{ marginTop: '0px'  }}>{username}</p> : <Link   href='/login'>Click to signin</Link>}
                    {username ? <button style={{ marginBottom: '0' }} onClick={handleLogOut}>Click to logout</button> : ''}
                </div>
            </Popper>
        </div>
    )
}


export default NavBar