<?php
class Utilities{
 
    public function getPaging($page, $total_rows, $records_per_page, $page_url){

        $paging_arr=array();
		$a = array();
 
        $total_pages = ceil($total_rows / $records_per_page);
 
        $initial_num = 1;
        $condition_limit_num = $total_pages;
		
        $paging_arr['pages']=array();
        $page_count=0;
        
		if (parse_url($page_url, PHP_URL_QUERY)) {
			$pos = strpos($page_url, '&');
			
			if ($pos === false) {
				$page_url .='&';
			} else {
				$page_url = substr($page_url, 0, $pos + 1);
			}
		}
		
        for($x = $initial_num; $x <= $condition_limit_num; $x++){

            if(($x > 0) && ($x <= $total_pages)){
				array_push($a, array("page" => $x, "url" => "{$page_url}page={$x}", "current_page" => $x == $page ? "yes" : "no" ));
                $page_count++;
            }
        }
 
        return $a;
    }
 
}