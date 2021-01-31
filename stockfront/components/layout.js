import NavBar from '../components/navbar'

export default function Layout({ children, username }) {
    return (
        <div>
            <NavBar username={username} />
            
            {children}
        </div>

    )

}
