<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Currency extends CI_Controller {

	function __construct()
	{
		parent::__construct();
		$this->load->model('CurrencyModel', 'CurrencyModel');
	}

	public function index()
	{
		// $temp = $this->CurrencyModel->getList();
		// print_r('<pre>');
		// print_r($temp);
		// print_r('</pre>');
		die('123');
		// $this->load->view('main');
	}

	public function currencylist()
	{
		$list = $this->CurrencyModel->getList();
		exit(json_encode($list));
	}

	public function get()
	{
		print_r('<pre>');
		print_r($_GET);
		print_r('</pre>');
		die('Ok get!');
	}

	public function create()
	{
		print_r('<pre>');
		print_r($_POST);
		print_r('</pre>');
		die('Ok create!');
	}
}
