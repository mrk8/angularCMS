<?php


 


// process.php

$errors = array();  // array to hold validation errors
$data = array();        // array to pass back data

// validate the variables ========
if (empty($_POST['message']))
  $errors['message'] = 'Message is required.';

if (empty($_POST['phone']))
  $errors['message'] = 'Phone is required.';

if (empty($_POST['email']))
  $errors['message'] = 'Email is required.';

if (empty($_POST['name']))
  $errors['message'] = 'Name is required.';

// The message
$message = "Appointment request:\n\r";
$message .=$_POST['name']."\n\r";
$message .=$_POST['phone']."\n\r";
$message .=$_POST['email']."\n\r";
$message .=$_POST['message']."\n\r";

// In case any of our lines are larger than 70 characters, we should use wordwrap()
$message = wordwrap($message, 70, "\r\n");
// Send
mail('brockrigdon@gmail.com', 'Appointment Request', $message);



//Text message
require('twillio/Services/Twilio.php'); 
$account_sid = 'AC4dbe7978c097c9e4f51ac48b33215d2b'; 
$auth_token = '3d76e96353bb2d9bf5054e87f7cd5705'; 
$client = new Services_Twilio($account_sid, $auth_token); 
 
$client->account->messages->create(array( 
    'To' => $_POST['phone'], 
    'From' => "+13853991350", 
    'Body' => $message, 
   // 'MediaUrl' => "http://farm2.static.flickr.com/1075/1404618563_3ed9a44a3a.jpg",  
));
// Text message






// return a response ==============

// response if there are errors
if ( ! empty($errors)) {
  // if there are items in our errors array, return those errors
  $data['success'] = false;
  $data['errors']  = $errors;
} else {

  // if there are no errors, return a message
  $data['success'] = true;
  $data['message'] = 'Success!';
}
echo json_encode($data);

