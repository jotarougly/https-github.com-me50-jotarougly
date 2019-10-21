const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

var list = document.getElementById('todo-list')
var itemCountSpan = document.getElementById('item-count')
var uncheckedCountSpan = document.getElementById('unchecked-count')
list = [];
var Totalcount = 0;
var uncheckedTotalcount = 0;

function newTodo() {
  //alert('New TODO added!');
  Totalcount++;
  itemCountSpan = Totalcount;
  uncheckedTotalcount = 0;
  var id = list.length;
  let item_count = id+1;
  list.push("<li> <input type='checkbox' id='"+ id +"' onclick='uncheckedCount(id)'/> TODO Num: " + item_count +" <input id='"+ id +"' type='submit' value='Delete' onclick='delete_function(id)'/></li>");
  display();
}

function display(){	
  	document.getElementById('unchecked-count').innerHTML = uncheckedTotalcount;
  	document.getElementById('item-count').innerHTML = itemCountSpan;
	document.getElementById('todo-list').innerHTML = list;
}

function uncheckedCount(id) {
	console.log("id = " + id);
    if (document.getElementById(id).checked) {
    	uncheckedTotalcount++;
    	document.getElementById('unchecked-count').innerHTML = Totalcount - uncheckedTotalcount;
    }else{
    	uncheckedTotalcount--;
    	document.getElementById('unchecked-count').innerHTML = Totalcount - uncheckedTotalcount;
    }
}

function delete_function(id){	
	console.log("id = " + id);
	//console.log(list.length);
	if(id == 0){
		list.shift();
	}else if(id == list.length){
		list.pop();
	}else{
		list.splice(id,1);
	}
	Totalcount--;
	itemCountSpan = Totalcount;
	//console.log(list.length);
	console.log(list);
	display();
}