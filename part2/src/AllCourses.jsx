const CourseHeader = ({course}) => {
    return (
    <h2>{course.name}</h2>
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


// just a debug component
const FirstCourse = ({courseList}) => {

  return (
    <div>
      <h1> Web Development Curriculum</h1>
      <CourseHeader course={courseList[0]}/>
      <Content course={courseList[0]}/>
      <Total   course={courseList[0]}/>
    </div>
  );
};

const Course = ({course}) => {
  return (
    <div>
      <CourseHeader course={course}/>
      <Content course={course}/>
      <Total   course={course}/>
    </div>
  );
};

const AllCourses = ({courseList}) => {

  return (
    <div>
      <h1> Web Development Curriculum</h1>
      {courseList.map(onecourse => <Course key={onecourse.id} course={onecourse}> </Course>)}
    </div>
  );
};

export default AllCourses
