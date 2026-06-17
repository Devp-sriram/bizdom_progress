import jsonObj from './wind.json' with { type: "json" };

console.log('----with find ----')

const student1 = jsonObj.find(obj => obj.studentId === 101)
const result =  student1.projects.find(project=> project.projectId === 2)
console.log(result)



console.log('----with filter----')

const student2 = jsonObj.filter(obj => obj.studentId === 101)
const filter_result = student2[0].projects.filter(project => project.projectId === 2)
console.log(filter_result[0])



console.log('----with map----')

jsonObj.map(obj => {
    if (obj.studentId === 101) {
        obj.projects.map(project => {
            if (project.projectId === 2) {
                console.log(project)
            }
        })
    }
})