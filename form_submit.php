<?php
include "functions.php";
waLog('$_REQUEST');
waLog($_REQUEST);
waLog('$_FILES');
waLog($_FILES);
$upload_file_path = "uploads" . DIRECTORY_SEPARATOR;
foreach ($_FILES as $FILE) {
    $file_name = uploadFiles($FILE, $upload_file_path);
}