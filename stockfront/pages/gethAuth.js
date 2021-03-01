import axios from 'axios';
import Cookies from 'cookies';

export async function getServerSideProps(context) {
    //Add a util function to check for authentication, to keep everything concise
    /* 
    Send token in a query string to this page
    Page will read the query string, then proceed to set a cookie on client side
    */

}
