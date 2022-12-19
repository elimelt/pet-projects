const Course = ({ course }) => {
    return (
        <div>
            <h1>{course.name}</h1>
            {course.parts.map((part) => 
                <Part 
                    key={part.id}
                    partName={part.name} 
                    partNum={part.exercises}
                /> 
            )}
            <Total parts={course.parts}/>
        </div>
    )
}

const Part = ({ partName, partNum }) => {
    return(
        <>
            <p>{partName} {partNum}</p>
        </>
    )
}

const Total = ({ parts }) => {

    const findTotal = (parts) => {
        return parts.reduce((total, part) => {
                return total + part.exercises
        }, 0)
    }

    return (
        <>
            <p>
                <b>total of {findTotal(parts)} exercises</b>
            </p>
        </>
    )
}

export default Course