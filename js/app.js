$("#response-panel").hide();
Culqi.publicKey = 'pk_test_p6nYVGxww8ZdUfCL';
Culqi.options({
  installments: true,
  lang: "EN"
});
Culqi.settings({
    title: 'Culqi Store',
    currency: 'PEN',
    description: 'Polo/remera Culqi lover',
    amount: 1000
});
$('#miBoton').on('click', function (e) {
    // Abre el formulario con las opciones de Culqi.configurar
    Culqi.open();
    e.preventDefault();
});
function culqi() {
  if (Culqi.token) {
    console.log(Culqi.token.id);
    alert(Culqi.token.id);
    $(document).ajaxStart(function(){
      run_waitMe();
    });
    $.ajax({
         type: 'POST',
         url: 'http://localhost/culqi-v2/culqi-php-develop/examples/02-create-charge.php',
         data: { token: Culqi.token.id , cuotas: Culqi.token.metadata.installments },
         datatype: 'json',
         success: function(data) {
           var result = "";
           if(data.constructor == String){
               result = JSON.parse(data);
           }
           if(data.constructor == Object){
               result = JSON.parse(JSON.stringify(data));
           }
           if(result.object === 'charge'){
            resultdiv(result.outcome.user_message);
           }
           if(result.object === 'error'){
               resultdiv(result.user_message);
               alert(result.merchant_message);
           }
         },
         error: function(error) {
           resultdiv(error)
         }
      });
  } else {
    $('#response-panel').show();
    $('#response').html(Culqi.error.merchant_message);
    $('body').waitMe('hide');
  }
};

function run_waitMe(){
  $('body').waitMe({
    effect: 'orbit',
    text: 'Procesando pago...',
    bg: 'rgba(255,255,255,0.7)',
    color:'#A32111'
  });
}

function resultdiv(message){
  $('#response-panel').show();
  $('#response').html(message);
  $('body').waitMe('hide');
}
