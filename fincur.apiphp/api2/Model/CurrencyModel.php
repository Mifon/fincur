<?php

require_once __DIR__."/Database.php";

class CurrencyModel extends Database
{
    public function getCurrencyList ($limit)
    {
        return $this->select("SELECT * FROM currency ORDER BY Name ASC Limit ?", ["i", $limit]);
    }
}