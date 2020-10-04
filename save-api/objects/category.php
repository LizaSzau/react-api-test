<?php
class Category{
 
    // database connection and table name
    private $conn;
    private $table_name = "api_categories";
 
    // object properties
    public $id;
    public $name;
    public $description;
    public $created;
 
    public function __construct($db){
        $this->conn = $db;
    }
 
    // used by select drop-down list
    public function readAll(){
        //select all data
        $query = "SELECT
                    id, name, description
                FROM
                    " . $this->table_name . "
                ORDER BY
                    name";
 
        $stmt = $this->conn->prepare( $query );
        $stmt->execute();
 
        return $stmt;
    }
	
	// used by select drop-down list
	public function read(){
	 
		//select all data
		$query = "SELECT
					id, name, description
				FROM
					" . $this->table_name . "
				ORDER BY
					name";
	 
		$stmt = $this->conn->prepare( $query );
		$stmt->execute();
	 
		return $stmt;
	}
	
	// category lis with occurances
	public function read_sum(){
		//select all data
		$query = "SELECT c.name AS name, c.id AS id, c.description AS description,  COUNT(p.id) AS sum
				  FROM api_categories AS c
			      LEFT JOIN api_products AS p 
				  ON c.id = p.category_id 
				  GROUP BY c.id
				  ORDER BY c.name";
					
		$stmt = $this->conn->prepare( $query );
		$stmt->execute();
	 
		return $stmt;
	}
	
	// used when filling up the update category form
	function readOne(){
	  
		// query to read single record
		$query = "SELECT id, name, description
				  FROM ".$this->table_name."
				  WHERE id = ?";
	
		// prepare query statement
		$stmt = $this->conn->prepare( $query );
	  
		// bind id of category to be updated
		$stmt->bindParam(1, $this->id);
	  
		// execute query
		$stmt->execute();
	  
		// get retrieved row
		
		$row = $stmt->fetch(PDO::FETCH_ASSOC);

		if ($row > 0) {
			$this->name = $row['name'];
			$this->description = $row['description'];
		}
	}
	
	// create category
	function create(){
	  
		// query to insert record
		$query = "INSERT INTO
					" . $this->table_name . "
				SET
					name=:name, description=:description";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	  
		// sanitize
		$this->name=htmlspecialchars(strip_tags($this->name));
		$this->description=htmlspecialchars(strip_tags($this->description));
		$this->created=htmlspecialchars(strip_tags($this->created));
	  
		// bind values
		$stmt->bindParam(":name", $this->name);
		$stmt->bindParam(":description", $this->description);
		$stmt->bindParam(":created", $this->created);
	  
		// execute query
		if($stmt->execute()){
			return true;
		}
	  
		return false;
	}
	
	// update the category
	function update(){
	  
		// update query
		$query = "UPDATE " . $this->table_name . " 
				SET name = :name,
					description = :description 
				WHERE id = :id";
	
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	  
		// sanitize
		$this->name=htmlspecialchars(strip_tags($this->name));
		$this->description=htmlspecialchars(strip_tags($this->description));
		$this->id=htmlspecialchars(strip_tags($this->id));
	  
		// bind new values
		$stmt->bindParam(':name', $this->name);
		$stmt->bindParam(':description', $this->description);
		$stmt->bindParam(':id', $this->id);
	  
		// execute the query
		if($stmt->execute()){
			return true;
		}
	  
		return false;
	}
	
	// delete the category
	function delete(){
	  
		// delete query
		$query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
	  
		// prepare query
		$stmt = $this->conn->prepare($query);
	  
		// sanitize
		$this->id=htmlspecialchars(strip_tags($this->id));
	  
		// bind id of record to delete
		$stmt->bindParam(1, $this->id);
	  
		// execute query
		if($stmt->execute()){
			return true;
		}
	  
		return false;
	}
	
}