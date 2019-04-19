const ws = new WebSocket("ws://localhost:8000");

function updateKey(keyName) {
  ws.send(JSON.stringify({ type: "key-update", value: keyName }));
}

const valueInput = document.querySelector("#value");
const keyInput = document.querySelector("#to");
let list = document.querySelector(".list");
 
let messages=[];
function updateValue(value) {
  ws.send(JSON.stringify({ to : keyInput.value,type: "value-update", value }));
//  messages.push(value);
//  console.log(messages);
  
}

ws.addEventListener("message", ({ data }) => {
  const message = JSON.parse(data);
  messages=message.value;
 // valueInput.value = message.value;
// console.log(message);
 list.innerHTML='';
  messages.forEach(element => {

    
    
    let li=document.createElement('LI');
    li.append(element);
    list.append(li);
  });



});

function sendMessage(){
  updateValue(valueInput.value);
  

}