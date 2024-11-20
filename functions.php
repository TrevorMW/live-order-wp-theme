<?php

/**
 * @package WordPress
 * @subpackage themename
 */

// LOAD CLASSES JIT
spl_autoload_register(function ($className) {
  $classDir  = get_template_directory() . '/assets/classes/';
  $classFile = 'class-' . str_replace('_', '-', strtolower($className)) . '.php';

  if (file_exists($classDir . $classFile)) {
    require_once $classDir . $classFile;
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// START UTILITY FUNCTIONS ///////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Load any needed body classes
 */
function addBodyClass($classes)
{
  $classes[] = '';
  return $classes;
}
add_filter('body_class', 'addBodyClass');


if (!function_exists('write_log')) {
  function write_log($log) {
      if (true === WP_DEBUG) {
          if (is_array($log) || is_object($log)) {
              error_log(print_r($log, true));
          } else {
              error_log($log);
          }
      }
  }
}
if (!function_exists('write_log')) {
  function write_log($log) {
      if (true === WP_DEBUG) {
          if (is_array($log) || is_object($log)) {
              error_log(print_r($log, true));
          } else {
              error_log($log);
          }
      }
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// END UTILITY FUNCTIONS /////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

require_once('utility-functions.php');
