<?php

/**
 *
 */
class CurrencyModel extends CI_Model
{
    public $tableName = 'currency';

    function __construct()
    {
        $this->load->database();
    }

    public function getDefault()
    {
        return (object)[
            'Name' => '',
            'CharLetter' => '',
            'Code' => 0,
            'DUpdate' => 0,
            'DCreate' => 0,
            'DDelete' => 0
        ];
    }

    public function getList()
    {
        return $this->db->where('DDelete', 0)
                        ->get($this->tableName)
                        ->result();
    }

    public function getById($id = 0)
    {
        if (empty($id)) return [];
        return $this->db->where('id', $id)
                        ->get($this->tableName)
                        ->result();
    }

    public function save($dataSave)
    {
        if (isset($dataSave['id']))
		{
			$id = $dataSave['id'];
			unset($dataSave['id']);
			$this->db->where('id', $id);
			$res = $this->db->update($this->tableName, $dataSave);
		}
		else
			$res = $this->db->insert($this->tableName, $dataSave);

        if ($res)
            $res = $this->db->insert_id();

        return $res;
    }

    public function delete($id)
    {
        if (!$id) return false;
        return $this->db->where('id', $id)
                        ->update($this->tableName, [
                            'dDelete' => time()
                        ]);
    }
}
