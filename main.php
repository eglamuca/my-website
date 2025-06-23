<?php
/**
 * 2025-03-26 require the core components (logger, authentication, controller)
 * 2024-05-02 dom controller monitoring updated
 * 2023-04-27 major merge of latest changes
 * 2020-07-20 version 3.0 created
 * 2013-10-23 version 2.0 created
 * 2010-06-24 version 1.0 created
 *
 * main entry point for the controller
 */

	/**
	 * global variables: the instance ID (request ID) and the start timestamp
	 */
 	$g_controller_main_execution_start_timestamp_microsec_float = microtime(true);
	$g_controller_main_execution_start_timestamp_utc_string = gmdate("d/m/Y H:i:s\te");
	$g_controller_main_instance_uid = str_replace(".", "", uniqid("", TRUE));

	/**
	 * define the basic structure of directories
	 */

	// the full name of the root dir for the web site this controller controls
	define("WEBSITE_ROOT_DIR_FULLNAME", dirname(dirname(__FILE__)));

	// the full name of the dir of this controller
	define("CONTROLLER_DIR_FULLNAME", dirname(__FILE__));

	// the directories of the controller modules
	define("CONTROLLER_LOGS_DIR_FULLNAME",      CONTROLLER_DIR_FULLNAME . "/logs");
	define("CONTROLLER_CORE_DIR_FULLNAME",      CONTROLLER_DIR_FULLNAME . "/core");
	define("CONTROLLER_SETTINGS_DIR_FULLNAME",  CONTROLLER_DIR_FULLNAME . "/settings");
	define("CONTROLLER_TEMPLATES_DIR_FULLNAME", CONTROLLER_DIR_FULLNAME . "/templates");
	define("CONTROLLER_TEMP_DIR_FULLNAME",      CONTROLLER_DIR_FULLNAME . "/tmp");
	define("CONTROLLER_WORKSPACE_DIR_FULLNAME", CONTROLLER_DIR_FULLNAME . "/ws");
	
	define("CONTROLLER_PHP_ERRORS_LOG_FULLNAME", CONTROLLER_LOGS_DIR_FULLNAME . "/controller-php-errors-log.txt");
	define("GENERAL_PHP_ERRORS_LOG_FULLNAME", CONTROLLER_LOGS_DIR_FULLNAME . "/general-php-errors-log.txt");

	/**
	 * make sure PHP errors will be written to log file and will not get displayed to client
	 */
	@ini_set("display_errors", false);
	@ini_set("expose_php", false);
	@ini_set("display_startup_errors", false);
	@ini_set("html_errors", false);
	@ini_set("log_errors", true);
	@ini_set("error_log", CONTROLLER_PHP_ERRORS_LOG_FULLNAME);

	/**
	 * set working dir to controller code and require the core components
	 *
	 * NOTE: require is not a function, it is like "copy-paste" of the required file, so it gets pasted into the context of the call to require!
	 *       in other words, in order to php code to function properly, it must not get required from within a function!
	 *       we must require all php code from outside of any scope!
	 */
	chdir(CONTROLLER_CORE_DIR_FULLNAME);chdir("."); // we must call chdir(".") in order to overcome PHP bug

	// core component: functions (exposed globally for use in other PHP files)
	$functions_php_file_fullname = CONTROLLER_CORE_DIR_FULLNAME . "/functions.php";
	if (!is_file($functions_php_file_fullname)) { trigger_error("File not found \"" . $functions_php_file_fullname . "\"", E_USER_ERROR); exit(0); }
	require $functions_php_file_fullname;

	// core component: logger
	$logger_php_file_fullname = CONTROLLER_CORE_DIR_FULLNAME . "/logger.php";
	if (!is_file($logger_php_file_fullname)) { trigger_error("File not found \"" . $logger_php_file_fullname . "\"", E_USER_ERROR); exit(0); }
	require $logger_php_file_fullname;
	
	// core component: authentication
	$authentication_php_file_fullname = CONTROLLER_CORE_DIR_FULLNAME . "/authentication.php";
	if (!is_file($authentication_php_file_fullname)) { trigger_error("File not found \"" . $authentication_php_file_fullname . "\"", E_USER_ERROR); exit(0); }
	require $authentication_php_file_fullname;

	// core component: controller (must be required last — takes over request handling)
	$controller_php_file_fullname = CONTROLLER_CORE_DIR_FULLNAME . "/controller.php";
	if (!is_file($controller_php_file_fullname)) { trigger_error("File not found \"" . $controller_php_file_fullname . "\"", E_USER_ERROR); exit(0); }
	require $controller_php_file_fullname;

?>