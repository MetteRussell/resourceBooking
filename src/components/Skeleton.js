import classNames from 'classnames';

function Skeleton({ times, className }) {
    const outerClassNames = classNames('relative', 'overflow-hidden', 'bg-gray-200', 
    'rounded', 'mb-2.5', className);
    const innerClassNames = classNames('animate-shimmer', 'absolut', 'inset-0', '-translate-x-full', 'bg-gradient-to-r', 
    'via-white', 'to-gray-200', className);

    const boxes = Array(times).fill(0).map((_, i) => {
        return (
        <div className={outerClassNames} key={i} >
            <div className={innerClassNames}/>
        </div>
        );
    });
    // for (let i = 0; i< times; i++) {
    //     boxes.push(<div key={i} />)
    // }
    return boxes;
}

export default Skeleton;