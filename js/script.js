let input_entry = document.querySelector('#target_entry'), btn_sumb = document.querySelector('#target_sumb');
let array = [];

function entry(text){
    array.push(text);
    console.log(Object.entries(array));
    document.querySelector('.main__tasks').innerHTML += "<p>" + text + "</p>";
}

btn_sumb.onclick = function(){
    entry(input_entry.value);
}