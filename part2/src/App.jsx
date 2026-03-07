import { useState } from "react";



const CourseHeader = ({course}) => {
    return (
    <h1>{course.name}</h1>
  );
};

const Content = ({course}) => {
  return (
    <div>
      {course.parts.map(onecourse => <Part key={onecourse.id} coursepart={onecourse}> </Part>)}
    </div>
  );
}

// don't  pass key as a prop, or you will get an error
const Part = ({coursepart}) => {
  return (
      <div>
        {coursepart.name} {"  "} {coursepart.exercises}
      </div>
  );
}

const Total = ({course}) => {
  return (
    //example of reduce: const totalPrice = orders.reduce((total, order) => total + order.price, 0);
    <b>
      Total of {course.parts.reduce((total, part) => total + part.exercises, 0)} exercises
    </b>
  );
}

const Course = (props) => {

  // Check if course is null, undefined, or not an array
  if (!props.course) {
    return <div>There are no courses available</div>;
  }

  return (
    <div>
      <CourseHeader course={props.course}/>
      <Content course={props.course}/>
      <Total   course={props.course}/>
    </div>
  );
};



const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 12,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App
