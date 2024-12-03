const appointmentsElement = document.getElementById('appointments');
const appointmentForm = document.getElementById('appointmentForm');

let newData = []; // Load appointments from JSON (explained later)
displayAppointments();
function displayAppointments() {
    
    newData=JSON.parse(localStorage.getItem('appointment'));
    let res='';
  
   for(let i=0;i<newData.length;i++)
    {
      
        res+=`<div id="appoinmentDetails" class="col-4" style=" margin-top: 40px;"><h2 class="mb-3">Appointment Details ${i+1}</h2>
        <p><strong>Name:</strong> <span id="Date">${newData[i].N}</span></p>
        <p><strong>Number:</strong> <span id="Date">${newData[i].C}</span></p>
        <p><strong>Date:</strong> <span id="Date">${newData[i].D}</span></p>
        <p><strong>Time:</strong> <span id="Time">${newData[i].T}</span></p>
        <p><strong>Subject:</strong> <span id="Subject">${newData[i].S}</span></p>
        <p><strong>Provider:</strong> <span id="Provider">${newData[i].P}</span></p>
        <p><strong>Location:</strong> <span id="Location">${newData[i].L}</span></p> </div>`
        // console.log(newData[i]);
        // document.getElementById("Date").textContent = ;
        // document.getElementById("Time").textContent = newData[i].T;
        // document.getElementById("Subject").textContent = newData[i].S;
        // document.getElementById("Provider").textContent = newData[i].P;
        // document.getElementById("Location").textContent = newData[i].L;
    
        // Display appointment details section
    }
    console.log(res);
    document.getElementById("appoinmentDis").innerHTML=res;

}


    function displayAppointmentDetails(event) {
        event.preventDefault(); // Prevent the form from submitting
    
        // Retrieve form data
        var date = document.getElementById("date").value;
        var time = document.getElementById("time").value;
        var subject = document.getElementById("subject").value;
        var provider = document.getElementById("provider").value;
        var location = document.getElementById("location").value;
        var name= document.getElementById("clientName").value;
        var number= document.getElementById("contact").value;
    var app = 
    {D :     date,  T: time, S: subject, P: provider, L: location,N:name,C:number};
    var appJson=[];
    if(localStorage.getItem('appointment')!=null)
    {
        appJson=    JSON.parse(localStorage.getItem('appointment'));
    }
     
    appJson.push(app);
    var JS=JSON.stringify(appJson);
    localStorage.setItem("appointment", JS);
    displayAppointments();

    

    
    
        // Update appointment details
        
    }
    