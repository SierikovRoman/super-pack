<?php

/* https://api.telegram.org/bot583294110:AAGcF0qIL0N0vswOsANFCgwdpjNc6D12uPs/getUpdates,
где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее */

$model = $_POST['model'];
$price = $_POST['price'];
$date = date("d.m.Y");
$time = date("H:i:s");
$name = $_POST['userName'];
$email = $_POST['userEmail'];
$phone = $_POST['userTelephone'];
$message = $_POST['userMessage'];
$title = '========== Заказ: ==========';

$token = "583294110:AAGcF0qIL0N0vswOsANFCgwdpjNc6D12uPs";
$chat_id = "-311108662";
$arr = array(
  ' ' => $title,
  'Дата: ' => $date,
  'Время: ' => $time,
  'Модель: ' => $model,
  'Цена: ' => $ptice,
  'Имя пользователя: ' => $name,
  'Email: ' => $email,
  'Телфон: ' => $phone,
  'Сообщение: ' => $message
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if ($sendToTelegram) {
  echo "Kaef";
} else {
  echo "Error";
}
?>