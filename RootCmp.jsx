import { About } from "./pages/About.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { Home } from "./pages/Home.jsx"

const { useState } = React

export function RootCmp() {

    const [page, setPage] = useState('home')

    return (
        <section className="app">

            <main>
                {page == 'home' && <Home />}
                {page == 'about' && <About />}
                {page == 'book' && <BookIndex />}
            </main>
        </section>
    )
}