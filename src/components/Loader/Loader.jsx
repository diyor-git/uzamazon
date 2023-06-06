const Loader = ({ color }) => {
    return (
        <svg class="loader" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="a" x1="8.042%" x2="100%" y1="0%" y2="23.865%">
                    <stop offset="0%" stopColor={color ? color : '#e9456a'} stopOpacity="0"></stop>
                    <stop offset="63.146%" stopColor={color ? color : '#e9456a'} stopOpacity=".631"></stop>
                    <stop offset="100%" stopColor={color ? color : '#e9456a'}></stop>
                </linearGradient>
            </defs>
            <g fillRule="evenodd" fill="none">
                <g transform="translate(1 1)">
                    <path d="M36 18c0-9.94-8.06-18-18-18" strokeWidth="2.5" stroke="url(#a)"></path>
                    <circle cx="36" cy="18" fill={color ? color : '#e9456a'} r="1"></circle>
                </g>
            </g>
        </svg>
    )
}

export default Loader
