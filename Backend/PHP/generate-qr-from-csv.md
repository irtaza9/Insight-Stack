# This Markdown file documents a PHP script that processes a CSV file to generate QR codes based on its content. Here's a breakdown of the script
  

## Defines a function `processCSVAndGenerateQR()` that takes a CSV file path as input and generates QR codes based on the data in the CSV file.


 - Within the function
 - It checks if the CSV file exists, and if not, it terminates execution
   with an error message.
   
  - It opens the CSV file for reading.
   
  - It reads each line of the CSV file, extracts necessary data (English
   and Arabic post IDs and titles), formats the data, and generates a QR
   code for each line.
   
  - It saves each QR code image to a directory named "QR" with a file
   name based on the English post title and ID.
   
  - It collects the paths of the generated QR code images in an array.
   
  - It demonstrates the usage of the function by providing a sample CSV
   file path and calling the function with it.
   
     
   
   It includes an example of the data format expected in the CSV file as
   a comment.
      
    "1079","نظامة","742","HARBAH"

  

This Markdown file serves as documentation for the PHP script, providing an overview of its purpose, usage, and functionality.


    <?php
    
    $error = 0;
    ini_set('display_errors', $error);
    ini_set('display_startup_errors', $error);
    error_reporting(E_ALL);
    
      
    
    /**
    
    * Processes a CSV file and generates QR codes based on its content.
    
    *
    
    * @param string $csvFilePath The file path of the CSV file to process.
    
    * @return array An array containing the paths of the generated QR code images.
    
    */
    
      
    
    function processCSVAndGenerateQR($csvFilePath) {
    
		if (!file_exists($csvFilePath)) {
		    die("Error: CSV file '$csvFilePath' not found.");   
		}
		      
		    
		$qr_image_paths = array();
        $file = fopen($csvFilePath, 'r');
        
            
        if (!$file) {
            die("Error: Unable to open CSV file.");
        }
        
            
        
        while (($line = fgetcsv($file)) !== FALSE) {
        
            $en_post_id = $line[0];
            
            $ar_title = $line[2];
            
            $ar_post_id = $line[1];
            
            $en_title = $line[3];
            
                
            
            $formatted_data = "en-$en_post_id,ar-$ar_post_id";
            
            $qr_endpoint = "http://api.qrserver.com/v1/create-qr-code/?data=" . urlencode($formatted_data) . "&size=300x300";
            $curl = curl_init($qr_endpoint);
            
                
            if (!$curl) {
                echo "Error: Failed to initialize CURL.";
                continue;
            }
            
                
            
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            $qr_image_data = curl_exec($curl);
                
            
            if ($qr_image_data === false) {
                echo "Error: CURL request failed - " . curl_error($curl);
                curl_close($curl);
                continue;
            }
            
                
            curl_close($curl);
            
            $qr_image_path = __DIR__ . "/QR/$en_title-$en_post_id.png";
            $save_result = file_put_contents($qr_image_path, $qr_image_data);
            
            if ($save_result === false) {
                echo "Error: Failed to save QR code image '$qr_image_path'.";
                continue;
            }
            
                
            
        $qr_image_paths[] = $qr_image_path;
    }
    
        fclose($file);
        return $qr_image_paths;
    
    }  
?>
 

## Usage
    $csvFilePath = 'wp_postmeta.csv';
    $generated_qr_paths = processCSVAndGenerateQR($csvFilePath);

## IMP
	chmod 777 /Applications/XAMPP/xamppfiles/htdocs/qr-generate/QR
