function home(){
    window.location.href = "index.html";
}

$(document).ready(function() {
    // Function to handle form submission
    $("#profile-form").submit(function(event) {
        event.preventDefault(); // Prevent the default form submission
        
        // Get form values
        var name = $("#name").val();
        var email = $("#email").val();
        var phone = $("#phone").val();
        var gender = $("#gender").val();
        var age = $("#age").val();
        var insuranceType = $("#insurance-type").val();
        var insuranceTerm = $("#insurance-term").val(); // Added line to get insurance term
        
        // Calculate premium amount based on insurance type and term
        var premiumAmount = calculatePremium(insuranceType, insuranceTerm);
        
        // Calculate insurance expiry date
        var today = new Date();
        var expiryDate = new Date(today.getFullYear() + parseInt(insuranceTerm), today.getMonth(), today.getDate());
        
        // Create an object to hold user information
        var userInfo = {
            "Name": name,
            "Email": email,
            "Phone": phone,
            "Gender": gender,
            "Age": age,
            "Insurance Type": insuranceType,
            "Insurance Term": insuranceTerm + " years", // Added insurance term to user info
            "Premium Amount": "$" + premiumAmount.toFixed(2), // Added premium amount to user info
            "Expiry Date": expiryDate.toDateString() // Added expiry date to user info
        };
        
        // Store user information in localStorage
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        
        // Display user information in a table
        displayUserInfo(userInfo);
    });
    
    // Function to calculate premium amount based on insurance type and term
    function calculatePremium(insuranceType, insuranceTerm) {
        // Sample premium calculation logic (replace with actual calculation logic)
        var basePremium = 500; // Base premium amount
        var termMultiplier = 1; // Term multiplier for premium calculation
        
        // Adjust premium based on insurance type and term
        if (insuranceType === "car") {
            // Premium calculation for car insurance
            termMultiplier = 1.2; // Example multiplier for car insurance
        } else if (insuranceType === "life") {
            // Premium calculation for life insurance
            termMultiplier = 0.8; // Example multiplier for life insurance
        } else if (insuranceType === "health") {
            // Premium calculation for health insurance
            termMultiplier = 1.5; // Example multiplier for health insurance
        } else if (insuranceType === "home") {
            // Premium calculation for home insurance
            termMultiplier = 1.0; // Example multiplier for home insurance
        }
        
        // Calculate premium amount based on base premium and term multiplier
        var premiumAmount = basePremium * termMultiplier * parseInt(insuranceTerm);
        return premiumAmount;
    }
    
    // Function to display user information in a table
    function displayUserInfo(userInfo) {
        // Clear any existing table rows
        $("#user-info-table tbody").empty();
        
        // Iterate over user information object and create table rows
        Object.keys(userInfo).forEach(function(key) {
            $("#user-info-table tbody").append("<tr><td>" + key + "</td><td>" + userInfo[key] + "</td></tr>");
        });
        
        // Show the table
        $("#user-info-table").show();
    }
    
    // Function to handle cancel button click
    function cancelUpdate() {
        // Clear form fields
        $("#profile-form")[0].reset();
        
        // Hide the user info table
        $("#user-info-table").hide();
    }
});

function toggleDashboard() {
    const policyDashboard = document.getElementById('policyDashboard');
    const currentDisplay = policyDashboard.style.display;

    // Toggle visibility based on the current state
    policyDashboard.style.display = currentDisplay === 'none' ? 'block' : 'none';
  }
