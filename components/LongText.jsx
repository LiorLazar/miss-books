const { useState } = React

export function LongText({ txt, length = 100 }) {

    const [isExpanded, setIsExpended] = useState(false)
    return (
        <p className="long-text">{isExpanded ? txt : txt.substring(0, length)}
            <span onClick={() => setIsExpended(!isExpanded)}>{isExpanded ? 'Show Less...' : 'Show More...'}</span></p>
    )
}