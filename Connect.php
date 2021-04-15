<?php

class Connect{
    
    private $rows;
    protected $stmt, $result;

    public function __construct(){
        $mysql_host = 'mysql_host';
        $port = 'port';
        $username = 'username';
        $password = 'password';
        $database = 'database_name';
        
        try{
             $this->stmt = new PDO('mysql:host=' . $mysql_host . ';dbname=' . $database . ';port=' . $port . ";charset=utf8", $username, $password );
        }catch(PDOException $e){
             echo('Houston we have a problem: ' . $e);
            die();
        }
    }

    public function query($sql, $data){
        $this->result = $this->stmt->prepare($sql);
        $this->result->execute($data);
    }

    public function rows(){
        for($i = 0; $i <=$this->result->rowCount()-1; $i++){
            $this->rows[] = $this->result->fetch(PDO::FETCH_ASSOC);
        }
        return $this->rows;
    }
}


?>