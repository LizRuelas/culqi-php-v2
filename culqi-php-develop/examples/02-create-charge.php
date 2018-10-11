<?php
header('Content-Type: application/json');

require '../Requests-master/library/Requests.php';
Requests::register_autoloader();
require '../lib/culqi.php';

use Culqi\Culqi;

$SECRET_API_KEY = 'sk_test_tGg70Nxa1NvzebK2';
$culqi = new Culqi(array('api_key' => $SECRET_API_KEY));
try {
  // Creando Cargo a una tarjeta
$charge = $culqi->Charges->create(
    array(
      "amount" => 1000,
      "currency_code" => "PEN",
      "email" => "liz.ruelas@culqi.com",
      "source_id" => $_POST["token"] ,
      "installments" => $_POST["cuotas"],
      "antifraud_details" => array(
          "address" =>"Calle Narciso de la Colina 421",
          "address_city"=> "Lima",
          "country_code" => "PE",
          "first_name" => "Liz",
          "last_name" => "Ruelas",
          "phone_number" => 123456789
      )
    )
);
  // Response
  echo json_encode($charge);
} catch (Exception $e) {
  echo json_encode($e->getMessage());
}
?>
