import { LongText } from "../components/LongText.jsx"

const { Outlet, Link } = ReactRouterDOM

export function About() {

    const txt = ` Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Optio dolore sapiente, iste animi corporis nisi atque tempora assumenda dolores.
                Nobis nam dolorem rerum illo facilis nemo sit voluptatibus laboriosam necessitatibus!`
    return (
        <section className="about container">
            <h1>About books and so...</h1>
            <LongText txt={txt} />

            <nav>
                <Link to="/about/team">Team</Link>
                <Link to="/about/vision">Vision</Link>
            </nav>
            <section>
                <Outlet />
            </section>
        </section>
    )
}