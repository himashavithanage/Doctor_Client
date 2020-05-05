<%@page import="com.Doctor"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Doctor Details</title>
<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.2.1.min.js"></script>
<script src="Components/doctors.js"></script>
</head>
<body>
	<div class="container">
		<div class="row">
			<div class="col-8">

				<h1>Doctor Module</h1>

				<form id="formDoctor" name="formDoctor" name="formDoctor" method="post" action="doctor.jsp">
					Doctor Name: <input id="doctorName" name="doctorName" type="text"
						class="form-control form-control-sm"> <br> Doctor
					Address: <input id="doctorAddress" name="doctorAddress" type="text"
						class="form-control form-control-sm"> <br> Doctor
					Email: <input id="doctorEmail" name="doctorEmail" type="text"
						class="form-control form-control-sm"> <br> Doctor
					PhoneNumber: <input id="doctorPhone" name="doctorPhone" type="text"
						class="form-control form-control-sm"> <br>Doctor
					Specification: <input id="doctorSpec" name="doctorSpec" type="text"
						class="form-control form-control-sm"> <br> <input
						id="btnSave" name="btnSave" type="button" value="Save"
						class="btn btn-primary"> <input type="hidden"
						id="hidDoctorIDSave" name="hidDoctorIDSave" value="">
				</form>

				<div id="alertSuccess" class="alert alert-success">
					<%
						out.print(session.getAttribute("statusMsg"));
					%>
				</div>
				<div id="alertError" class="alert alert-danger"></div>

				<br>
				<div id="divDoctorsGrid">
					<%
						Doctor doctorObj = new Doctor();
					out.print(doctorObj.readDoctors());
					%>

				</div>
			</div>
		</div>
	</div>
</body>
</html>