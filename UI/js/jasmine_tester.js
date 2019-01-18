function ToDo(){
  this.todo = [];
}
ToDo.prototype.addTodo= function(item){
  this.todo.push(item)
}
ToDo.prototype.getItems= function(){
  return this.todo
}

describe('Testing the functionality, this is the checklist', ()=>{
  it('should add an item', ()=>{
    let todo = new ToDo();
    let item = {
     title: "get milk",
     complete: false
   }
    const done = todo.addTodo(item)
    expect(todo.getItems().length).toBe(1);
  })
})