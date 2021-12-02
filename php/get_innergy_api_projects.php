<?php

function callAPI($method, $url, $data){
   $curl = curl_init();
   switch ($method){
      case "POST":
         curl_setopt($curl, CURLOPT_POST, 1);
         if ($data)
            curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
         break;
      case "PUT":
         curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "PUT");
         if ($data)
            curl_setopt($curl, CURLOPT_POSTFIELDS, $data);			 					
         break;
      default:
         if ($data)
            $url = sprintf("%s?%s", $url, http_build_query($data));
   }
   
   // OPTIONS:
   curl_setopt_array($curl, array(
      CURLOPT_URL => $url,
      CURLOPT_HTTPHEADER => array(
         // TODO: Remove hard-coded api-key
         'Api-Key: '.$_SERVER['API_KEY'],
         'Content-Type: application/json',
      ),
      CURLOPT_RETURNTRANSFER => 1,
      CURLOPT_HTTPAUTH => CURLAUTH_BASIC,
      CURLOPT_ENCODING => '',
      CURLOPT_SSL_VERIFYPEER => 0,
      CURLOPT_SSL_VERIFYHOST => 0,
      CURLOPT_FOLLOWLOCATION => true,
      // DEBUG OPTION
      CURLOPT_VERBOSE => true
   )
   );

   // EXECUTE: [INACTIVE] Write verbose log to temp file
   $streamVerboseHandle = fopen('php://temp', 'w+');
   curl_setopt($curl, CURLOPT_STDERR, $streamVerboseHandle);

   // PRINT ERRORS
   $result = curl_exec($curl);
   if(!$result){
      echo "An error occured while trying to access Innergy.\n\n";
      echo "HTTP CODE: ".curl_getinfo($curl, CURLINFO_HTTP_CODE)."\n\n";
      printf("cUrl error (#%d): %s<br>\n", curl_errno($curl), htmlspecialchars(curl_error($curl)));
      die();
   }

   //DEBUGGING:
   rewind($streamVerboseHandle);
   $verboseLog = stream_get_contents($streamVerboseHandle);

   // echo "cUrl verbose information:\n", "<pre>", htmlspecialchars($verboseLog), "</pre>\n";
   
   //FINISH:
   curl_close($curl);
   return $result;
}

// Execute cURL
$get_projects = callAPI('GET', 'https://app.innergy.com/api/projects', false);
$projects_array = json_decode($get_projects, true);

// LOW-TIER EXCEPTION HANDLING
// Check if API data is loaded else kill the process and send back errors
if (!array_key_exists("Items", $projects_array))
{
   $err_msg = "";
   foreach ($projects_array['Messages'] as $msg)
      { $err_msg .= $msg."\r\n"; }
   echo $err_msg;
   // Send bad request back to Ajax to trigger error event
   header('HTTP/1.1 500 Innergy data not loaded');
   die();
}

unset($projects_array);

echo $get_projects;
//echo var_dump($data_array);
?>