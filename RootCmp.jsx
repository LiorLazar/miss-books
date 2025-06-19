import { AppHeader } from "./components/AppHeader.jsx"
import { About } from "./pages/About.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { Home } from "./pages/Home.jsx"

const { useState } = React
const Router = ReactRouterDOM.HashRouter

const { Routes, Route, Navigate } = ReactRouterDOM

export function RootCmp() {

    return (
        <Router>
            <section className="app">
                <AppHeader />
                <main>
                    <Routes>
                        <Route path='/' element={<Navigate to="/home" />} />
                        <Route path='/home' element={<Home />} />
                        <Route path='/about' element={<About />} />
                        <Route path='/book' element={<BookIndex />} />
                    </Routes>
                </main>
            </section>
        </Router>
    )
}