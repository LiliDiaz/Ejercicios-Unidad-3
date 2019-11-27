var socket = io.connect('http://192.168.43.89:8081', { 'forceNew': true });

socket.on('messages', function(data) {
  console.log(data);
  render(data);
})
function render (data) {
  var html = data.map(function(elem, index) {
    vocal (elem.text);
    return(`<div>
              <strong>${elem.author}</strong>:
              <em>${elem.text}</em>
            </div>`);
  }).join(" ");

  document.getElementById('messages').innerHTML = html;
}
function vocal(msj){
    
    var Vo=msj.match(/[aeiou|AEIOU]/g);
    if (Vo!=null)
      Vo=Vo.length;
    else
      Vo=0;
      document.getElementById('vocales').innerHTML = `Numero de vocales: ${Vo}`;


      canpal(msj);
      cantnum(msj);
      iniMayus(msj);
      Finalsinvocal(msj);
}

function canpal (msj) {
  let pala=msj.match (/[a-zA-Z]{2,}/g);
  if (pala!=null)
      pala=pala.length;
    else
      pala=0;
      document.getElementById('cantidadpalabras').innerHTML = `Palabras encontradas ${pala}`;

}

function cantnum (msj){
  let cannume=msj.match (/[0-9]/g);
  if (cannume!=null)
      cannume=cannume.length;
    else
      cannume=0;
      document.getElementById('numeros').innerHTML = `Cantidad de Números: ${cannume}`;

}

function iniMayus(msj){
  let inicioMayus=msj.match(/\b[A-Z]/g, "");
  if (inicioMayus!=null)
      inicioMayus=inicioMayus.length;
else
  inicioMayus=0;
  document.getElementById('Mayusculas').innerHTML = `Palabras de inicio con mayúscula: ${inicioMayus}`;

}
function Finalsinvocal(msj){
  let finvol=msj.match(/[^aeiou\W\d]\b/g, "");
  if (finvol!=null)
      finvol=finvol.length;
else
  finvol=0;
  document.getElementById('Finvocal').innerHTML = `Palabras que NO finalizan con vocal: ${finvol}`;
}
function addMessage(e) {
  var message = {
    author: document.getElementById('username').value,
    text: document.getElementById('texto').value
  };

  socket.emit('new-message', message);
  return false;
}
