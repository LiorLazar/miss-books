
export function AppHeader({ onSetPage }) {

    const links = [
        { path: 'home' }, { path: 'about' }, { path: 'book' }
    ]
    return (
        <header className="app-header container">
            <section>
                <h1>Miss Books</h1>
                <nav className="app-nav">
                    {links.map(link => <a key={link.path} onClick={() => onSetPage(link.path)}>{link.path}</a>)}
                    {/* <a onClick={() => onSetPage('home')}>Home</a>
                    <a onClick={() => onSetPage('about')}>About</a>
                    <a onClick={() => onSetPage('book')}>Books</a> */}
                </nav>
            </section>
        </header>
    )
}