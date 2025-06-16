import { About } from "./pages/About.jsx"
import { Home } from "./pages/Home.jsx"

const { useState } = React

export function RootCmp() {

    const [page, setPage] = useState('home')

    return (
        <section className="app">

            <main>
                {page == 'home' && <Home />}
                {page == 'about' && <About />}
            </main>
        </section>
    )
}