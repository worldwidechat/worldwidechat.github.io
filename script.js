const socket = io('https://worldwidechat.github.io/server.js');
const salon = document.getElementById('message-container');
const machine = document.getElementById('send-container');
const messageinpute = document.getElementById('message-input');
 
var cs = messageinpute.value.length;
document.getElementById('chara').innerHTML = cs;




const name = prompt('name: ')
socket.emit('user',name)

socket.on('chat-message',data=>{
    appendMessage(`${data.id}: ${data.message}`)
    console.log(`${data.id}: ${data.message}`);
})

socket.on('usercount', yo =>{
    
    console.log(yo);
})

function sendmessage(){

const message = messageinpute.value;
if(message){
socket.emit('send',message)
messageinpute.value = '';
updatecount()
}}


function appendMessage(message){
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    salon.append(messageElement);
}



function updatecount(){
    cs = messageinpute.value.length;
    
     document.getElementById('chara').innerHTML = cs;
       
    
}


  paypal.Button.render({
    // Configure environment
    env: 'sandbox',
    client: {
      sandbox: 'ASlbPltk-hBfirs3oo36tas6Pv1XnZsLVKq6MauXrw63B5d4rXLEcQf48m3o9CXUAhul1wNaC4sHOt6X',
      production: 'demo_production_client_id'
    },
    // Customize button (optional)
    locale: 'en_US',
    style: {
    
      height:50,
      
      color: 'black',
      shape: 'rect',
      label:'paypal',
      tagline:'false',
    },

    // Enable Pay Now checkout flow (optional)
    commit: true,

    // Set up a payment
    payment: function(data, actions) {
      return actions.payment.create({
        transactions: [{
          amount: {
            total: cs*0.01,
            currency: 'USD'
          }
        }]
      });
    },
    // Execute the payment
    onAuthorize: function(data, actions) {
      return actions.payment.execute().then(function() {
        // Show a confirmation message to the buyer
        
        sendmessage();
      });
    }
  }, '#paypal-button');

