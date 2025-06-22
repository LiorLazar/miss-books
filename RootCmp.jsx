import { AppHeader } from "./components/AppHeader.jsx"
import { About } from "./pages/About.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"
import { BookEdit } from "./pages/BookEdit.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { Home } from "./pages/Home.jsx"
import { UserMsg } from "./components/UserMsg.jsx"
import { AddReview } from "./pages/AddReview.jsx"
import { BookAdd } from "./components/BookAdd.jsx"

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

                        <Route path='/book/:bookId' element={<BookDetails />} />
                        <Route path='/book/:bookId/review' element={<AddReview />} />
                        <Route path='/book/edit' element={<BookEdit />} />
                        <Route path='/book/edit/:bookId' element={<BookEdit />} />
                        <Route path='/book/add' element={<BookAdd />} />
                    </Routes>
                </main>
                <UserMsg />
            </section>
        </Router>
    )
}