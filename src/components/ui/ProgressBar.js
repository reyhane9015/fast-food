
function ProgressBar({ prop , className }) {

    return (
        <>
            <h1 className={className}>{prop}%</h1>
            <div class="h-3 relative max-w-xl rounded-full overflow-hidden">
                <div className="w-full h-full bg-gray-200 absolute"></div>
                <div
                    id="bar"
                    className="transition-all ease-out duration-1000 h-full bg-green-500 relative"
                    style={{ width: `${prop}%` }}
                ></div>
            </div>
        </>
    );
}

export default ProgressBar;

