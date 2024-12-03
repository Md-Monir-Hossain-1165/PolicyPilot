
showBankingDetails();

// Add event listener for the change event of paymentMethod
document.getElementById("paymentMethod").addEventListener("change", showBankingDetails);

// Function to toggle additional fields based on the selected mobile banking provider
function showBankingDetails() {
    var selectedPaymentMethod = document.getElementById("paymentMethod").value;
    var selectedBankingDetail = document.getElementById(selectedPaymentMethod + "Details");
    var bankingDetails = document.querySelectorAll(".bankingDetails");

    bankingDetails.forEach(function (detail) {
        detail.style.display = "none";
    });

    if (selectedBankingDetail) {
        selectedBankingDetail.style.display = "block";
    }
}

// Function to handle the submission of the payment form
function submitPayment() {
    var premiumAmount = document.getElementById("premiumAmount").value.trim();
    var policy = document.querySelector("#paymentForm select").value;
    var paymentMethod = document.getElementById("paymentMethod").value;
    var additionalDetails = {};

    switch (paymentMethod) {
        case "creditCard":
            additionalDetails = getCreditCardDetails();
            break;
        case "netBanking":
            additionalDetails = getNetBankingDetails();
            break;
        case "mobileBanking":
            additionalDetails = getMobileBankingDetails();
            break;
        default:
            break;
    }

    if (!isAllFieldsFilled(additionalDetails) ) {
        alert("Please fill in all required fields for the selected payment method.");
        return;
    }
    else if(!premiumAmount)
    {
        
        alert("Premium amount cannot be empty!");
        return false;
    }

    var transactionID = generateID();
    var transaction = {
        id: transactionID,
        amount: premiumAmount,
        policy: policy,
        paymentMethod: paymentMethod,
       
    };

    var transactionJSON = JSON.stringify(transaction);
    localStorage.setItem(transactionID, transactionJSON);

    alert("Payment Successful! Your transaction ID is: " + transactionID);
    displayPaymentDetails(transaction);
}

// Function to retrieve credit card details
function getCreditCardDetails() {
    return {
        cardNumber: document.getElementById("cardNumber").value.trim(),
        expiryDate: document.getElementById("expiryDate").value.trim(),
        cvv: document.getElementById("cvv").value.trim()
    };
}

// Function to retrieve net banking details
function getNetBankingDetails() {
    return {
        bankName: document.getElementById("netBankName").value.trim(),
        userID: document.getElementById("netUserID").value.trim(),
        password: document.getElementById("netPassword").value.trim()
    };
}

// Function to retrieve mobile banking details
function getMobileBankingDetails() {
    return {
        mobileBankingProvider: document.getElementById("mobileBankingProvider").value.trim(),
        mobileNumber: document.getElementById("mobileNumber").value.trim(),
        PIN: document.getElementById("PIN").value.trim()
    };
}

// Function to generate unique ID
function generateID() {
    return  Math.random().toString(36);
}

// Function to check if all required fields for the selected payment method are filled
function isAllFieldsFilled(additionalDetails) {
    for (var key in additionalDetails) {
        if (additionalDetails.hasOwnProperty(key) && additionalDetails[key] === "") {
            return false;
        }
    }
    return true;
}

// Function to display payment details
function displayPaymentDetails(transaction) {
    document.getElementById("policy").textContent = transaction.policy;
    document.getElementById("premiumAmountDisplay").textContent = transaction.amount;
    document.getElementById("userID").textContent = transaction.id;
    document.getElementById("paymentDetails").style.display = "block";
}

// Function to handle the submission of the claim form
function submitClaim() {
    var claimID = document.getElementById("claimID").value;
    var claimAmount = document.getElementById("claimAmount").value;
    var claimPolicy = document.getElementById("claimPolicy").value; // Parse claim amount 
    localStorage.setItem("claimAmount", claimAmount); // Store the claim amount in localStorage with a key "claimAmount"

    var savedTransactionJSON = localStorage.getItem(claimID);
    if (!savedTransactionJSON) {
        alert("No transaction found for the given ID.");
        return;
    }

    var savedTransaction = JSON.parse(savedTransactionJSON);

    if (savedTransaction.amount < claimAmount ) { // Check if the saved transaction amount is less than the claimed amount
        alert("Not enough money available for this Payment ID.");
        return;
    }
    else if(savedTransaction.policy !== claimPolicy )
    {
        alert("Not match with policy");
        return false;
        
    }
 else if(savedTransaction.amount > claimAmount && savedTransaction.policy === claimPolicy ) {
    alert("Money claimed successfully!");
    document.getElementById("claimAmountD").textContent = claimAmount;
    document.getElementById("Claimed").style.display = "block";
}
}