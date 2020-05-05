$(document).ready(function() 
{  
	if ($("#alertSuccess").text().trim() == "")  
	{   
		$("#alertSuccess").hide();  
	}  
	$("#alertError").hide(); }); 
 
// SAVE ============================================ 
$(document).on("click", "#btnSave", function(event) 
{  
	// Clear alerts---------------------  
	$("#alertSuccess").text("");  
	$("#alertSuccess").hide();  
	$("#alertError").text("");  
	$("#alertError").hide(); 
 
	// Form validation-------------------  
	var status = validateDoctorForm();  
	if (status != true)  
	{   
		$("#alertError").text(status);   
		$("#alertError").show();   
		return;  
	} 
 
	// If valid------------------------  
	var type = ($("#hidDoctorIDSave").val() == "") ? "POST" : "PUT"; 
	
	$.ajax( 
	{  
		url : "DoctorsAPI",  
		type : type,  
		data : $("#formDoctor").serialize(),  
		dataType : "text",  
		complete : function(response, status)  
		{   
			onDoctorSaveComplete(response.responseText, status);  
		} 
	}); 
}); 

function onDoctorSaveComplete(response, status) 
{  
	if (status == "success")  
	{   
		var resultSet = JSON.parse(response); 

		if (resultSet.status.trim() == "success")   
		{    
			$("#alertSuccess").text("Successfully saved.");    
			$("#alertSuccess").show(); 

			$("#divDoctorsGrid").html(resultSet.data);   
		} else if (resultSet.status.trim() == "error")   
		{    
			$("#alertError").text(resultSet.data);    
			$("#alertError").show();   
		} 

	} else if (status == "error")  
	{   
		$("#alertError").text("Error while saving.");   
		$("#alertError").show();  
	} else  
	{   
		$("#alertError").text("Unknown error while saving..");   
		$("#alertError").show();  
	} 

	$("#hidDoctorIDSave").val("");  
	$("#formDoctor")[0].reset(); 
} 
 
// UPDATE========================================== 
$(document).on("click", ".btnUpdate", function(event) 
{     
	$("#hidDoctorIDSave").val($(this).closest("tr").find('#hidDoctorIDUpdate').val());     
	$("#doctorName").val($(this).closest("tr").find('td:eq(0)').text());     
	$("#doctorAddress").val($(this).closest("tr").find('td:eq(1)').text());
	$("#doctorEmail").val($(this).closest("tr").find('td:eq(2)').text());
	$("#doctorPhone").val($(this).closest("tr").find('td:eq(3)').text());     
	$("#doctorSpec").val($(this).closest("tr").find('td:eq(4)').text()); 
}); 

//REMOVE===========================================
$(document).on("click", ".btnRemove", function(event) 
{  
	$.ajax(  
	{   
		url : "DoctorsAPI",   
		type : "DELETE",   
		data : "doctorID=" + $(this).data("doctorid"),   
		dataType : "text",   
		complete : function(response, status)   
		{    
			onDoctorDeleteComplete(response.responseText, status);   
		}  
	}); 
}); 

function onDoctorDeleteComplete(response, status) 
{  
	if (status == "success")  
	{   
		var resultSet = JSON.parse(response); 

		if (resultSet.status.trim() == "success")   
		{    
			$("#alertSuccess").text("Successfully deleted.");    
			$("#alertSuccess").show(); 
		
			$("#divDoctorsGrid").html(resultSet.data);   
		} else if (resultSet.status.trim() == "error")   
		{    
			$("#alertError").text(resultSet.data);    
			$("#alertError").show();   
		}

	} else if (status == "error")  
	{   
		$("#alertError").text("Error while deleting.");   
		$("#alertError").show();  
	} else  
	{   
		$("#alertError").text("Unknown error while deleting..");   
		$("#alertError").show();  
	}
}

//CLIENTMODEL=========================================================================
function validateDoctorForm()
{
// NAME
if ($("#doctorName").val().trim() == "")
 {
 return "Insert Doctor Name.";
 }
// ADDRESS
if ($("#doctorAddress").val().trim() == "")
 {
 return "Insert Doctor Address.";
 } 

//EMAIL-------------------------------
if ($("#doctorEmail").val().trim() == "")
 {
 return "Insert Doctor Email.";
 }

//PHONE-------------------------------
var tmpPhone = $("#doctorPhone").val().trim();
if (!$.isNumeric(tmpPhone)) 
 {
 return "Insert numeric value for Doctor Phone.";
 }

//SPECIFICATION-------------------------------
if ($("#doctorSpec").val().trim() == "")
 {
 return "Insert Doctor Specification.";
 }

return true;
}
