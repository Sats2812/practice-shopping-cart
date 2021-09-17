const todos=[
    {
        id:1,
        text:'Take out the trash',
        isCompleted:true,

    },
    {
        id:2,
        text:'Meeting with Boss',
        isCompleted:true,

    },
    {
        id:3,
        text:'Dentist appt',
        isCompleted:false,

    }

];

const todoCompleted=todos.filter(function(todo)
{
    return todo.isCompleted == true;
}).map(function(todo)
{
    return todo.text
});

console.log(todoCompleted)