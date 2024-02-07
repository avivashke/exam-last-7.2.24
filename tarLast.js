
//MARKING ROWS BY RATING

//get all of the table rows
const rows = document.querySelectorAll('table tr');

//loop through rows 
rows.forEach((row) => {
const ratingCell = row.querySelector('td.rate');
if (ratingCell) {
    // Get the rating value
    const ratingValue = ratingCell.textContent.trim(); 
    if (ratingValue) {
        // Extract the numeric part of the rating
       const numericRating = parseFloat(ratingValue);
       if (numericRating <= 2) {
        row.style.backgroundColor = 'red';
       } else if (numericRating >= 4){
        row.style.backgroundColor = 'green';
       }
    }}}

)



//AVERAGE PRICE OF ALL ROWS
function averagePrice(){
    const priceCells = document.querySelectorAll('.price');

    let totalSum = 0;
    let rowCount = 0;

    //loop through price cells
    priceCells.forEach((cell) =>{
        //extract the numeric value\
        const price = parseFloat(cell.textContent);

        //check for a valid number
        if(!isNaN(price)){
            totalSum += price;
            rowCount++;
        }
    });

    //calculating the average of the sum of prices
// Calculate the average price
const avgPrice = rowCount > 0 ? totalSum / rowCount : 0;

// Update the <h2> text content
document.getElementById('avg').textContent = `Average price of all the TV's:  $${avgPrice}`;    
console.log(avgPrice);
}
averagePrice();
    

//ex 4 - Best Option


function findBestOption(options){
    
    const tableRows = document.querySelectorAll('#table tbody tr');
    let bestOptionId = null;
    let lowestPrice = Infinity;

    tableRows.forEach((row) => {
        //extract information from the row
        const id = row.getAttribute('id');
        const priceCell = row.querySelector('.price');
        const ratingCell = row.querySelector('.rate');

        //check if both price and rating cells exist
        if (priceCell && ratingCell) {
            //extract numeric values from the cells
            const price = parseFloat(priceCell.textContent);
            const [rating, maxRating]  = ratingCell.textContent.split('/').map(Number);
            
            //if price is lower than the current lowest price and rating is 4 or 5
            if  (price <= lowestPrice && (rating == 4 || rating == 5)) {
                lowestPrice = price;
                bestOptionId = id;
            }
        }
        }
        
    );
    return bestOptionId;
}

const bestOptionId = findBestOption();
document.write(`The best option is: ${bestOptionId}`);


//buy and delete buttons
// Get a reference to the table
const table = document.getElementById("table");

// function to delete a row
function deleteRow(rowId) {
    const row = document.getElementById(rowId);
    table.deleteRow(row.rowIndex);
}

// function to open the buy form
function openBuyForm(storeName, price) {
    // creating a new window or tab
    const win = window.open("", "_blank");

    // the form in the new window
    win.document.write(`
        <html>
        <head>
            <title>Buy Form</title>
            <link rel="stylesheet" href="style.css"> </head>
        <body>
            <h2>Purchase Confirmation</h2>
            <p>Store Name: ${storeName}</p>
            <p>Price: ${price}</p>
            <form action="#">
                <label for="card-number">Credit Card Number:</label>
                <input type="number" min="15" max="16" id="card-number" name="card-number" required>
                <label for="expiration-date">Expiration Date:</label>
                <input type="date" id="expiration-date" name="expiration-date" required>
                <button type="submit">Send</button>
            </form>
        </body>
        </html>
    `);
}

// Add event listeners to the buttons
table.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("btn-danger")) {
        deleteRow(target.closest("tr").id);
    } else if (target.classList.contains("btn-primary")) {
        const row = target.closest("tr");
        const storeName = row.querySelector("td:nth-child(3)").textContent;
        const price = row.querySelector(".price").textContent;
        openBuyForm(storeName, price);
    }
});

