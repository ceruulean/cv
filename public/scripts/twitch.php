<?php

if ($_POST["first"] == "1") {
 
 $message = "Thanks " .  $_POST["from_id"] . " for following!"
 echo "<h1>{$message}</h1>"; 
}

// if(!empty($_POST["fname"]) && !empty($_POST["message"])) {


//   $info = "From: " . ($_POST["fname"]) . " (" . ($_POST["email"]) . "): <br/>"
//   . ($_POST["message"]);


//   $contactFormObj->to = array(1 => "mailthegale@gmail.com");
//   $contactFormObj->subject = $_POST["subject"];
//   $contactFormObj->body = $info;
//   $contactFormObj->type = "html";


//   $payload = json_encode($contactFormObj);

//   $token = "jWJYHR78Q34IHKuajrhjk32iothgkjealb";
//   //?access_token=staticToken

//   // create curl resource
//   $ch = curl_init();
//   // set url 
//   curl_setopt($ch, CURLOPT_URL, "https://api.the-gale.com/_/mail?access_token=" . $token);
//   curl_setopt($ch, CURLOPT_POST, true);
//   curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
//   // Set HTTP Header for POST request 
//   curl_setopt($ch, CURLOPT_HTTPHEADER, array(
//   'Content-Type: application/json',
//   'Content-Length: ' . strlen($payload))
//   );
//   // $output contains the output json
//   $output = curl_exec($ch);
//   // close curl resource to free up system resources 
//   curl_close($ch);
//  // var_dump(json_decode($output, true));
//   http_response_code(987);
// }

?>