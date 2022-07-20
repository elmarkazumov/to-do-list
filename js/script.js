let input_entry = document.querySelector('#target_entry'), btn_sumb = document.querySelector('#target_sumb');

function entry(text){
    let task = document.createElement('div');
    task.classList = 'main__task';
    
    let task_checkbox = document.createElement('input');
    task_checkbox.setAttribute("type", "checkbox");

    let task_text = document.createElement('p');
    task_text.append(text);

    task.append(task_checkbox);
    task.append(task_text);

    document.querySelector('.main__tasks').append(task);

    task_checkbox.addEventListener("click", function() {
      if(task_checkbox.checked == true){
        task.classList.add("main__inactive");
        task.setAttribute("contenteditable", "false");
      } else{
        task.classList.remove("main__inactive"); 
      }

    });
}

btn_sumb.onclick = function(){
    entry(input_entry.value);
}
