<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Main extends CI_Controller {

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
        // die('123');
		$this->load->view('main');
	}
}
