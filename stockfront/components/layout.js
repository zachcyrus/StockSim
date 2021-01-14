import NavBar from '../components/navbar'

export default function Layout({ children }) {
    return (
        <div>
            <NavBar />
            {children}
        </div>

    )

}
