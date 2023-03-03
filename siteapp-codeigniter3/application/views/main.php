<?php
defined('BASEPATH') OR exit('No direct script access allowed');

// $appAssetManifest = file_get_contents("../fincur/build/asset-manifest.json");
$appAssetManifest = file_get_contents("app/build/asset-manifest.json");
$appAssetManifest = json_decode($appAssetManifest);

// var_dump($ourData);
// print_r('<pre>');
// print_r($appAssetManifest);
// print_r('</pre>');
// die('123');

// include '../fincur/build/index.html';
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>React App</title>


    <?php
    foreach ($appAssetManifest->entrypoints as $key => $filePath) {
        if (stripos($filePath, '.css') !== false) {
            echo '<link rel="stylesheet" href="/app/build/'.$filePath.'">';
        }
    }
    ?>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>

    <?php
    foreach ($appAssetManifest->entrypoints as $key => $filePath) {
        if (stripos($filePath, '.js') !== false) {
            echo '<script src="/app/build/'.$filePath.'"></script>';
        }
    }
    ?>
  </body>
</html>
