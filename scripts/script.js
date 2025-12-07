// Customer queue management
let queue = [
    { id: 1, name: 'Ali - example 🤖' },
    { id: 2, name: 'Sara - example 🤖' },
    { id: 3, name: 'Ahmed - example 🤖' }
];
let currentCustomer = null;
let nextId = 4; // if i son't put these examples i will make it 1

// DOM Elements
const addButton = document.getElementById('add_customer');
const nextButton = document.getElementById('next_customer');
const customerInput = document.querySelector('.add_customer_container input');
const currentCustomerDisplay = document.getElementById('current_customer');
const customerList = document.querySelector('.customer_list');

// Below will make it Auto Remove first customer if the queue is not empty
function init() {
    if (queue.length > 0) {
        currentCustomer = queue.shift();
    }
    updateDisplay();
}

// Here I Update the displayed customers
function updateDisplay() {
    // Here I Update the current customer
    if (currentCustomer) {
        currentCustomerDisplay.innerHTML = `<span>Now Serving: </span>#${currentCustomer.id} -- ${currentCustomer.name}`;
    } else {
        nextId = 1;
        currentCustomerDisplay.innerHTML = `No customers Until now Enjoy 🤐`;
    }

    // Here I Update the customer list
    customerList.innerHTML = '';
    queue.forEach(customer => {
        const customerDiv = document.createElement('div');
        customerDiv.className = 'customer';
        customerDiv.innerHTML = `<p>#${customer.id} -- ${customer.name}</p>`;
        customerList.appendChild(customerDiv);
    });
}

// This will Add customer to queue
function addCustomer() {
    const name = customerInput.value.trim();

    if (name === '') {
        alert('Please enter a customer name');
        return;
    }

    const newCustomer = {
        id: nextId++,
        name: name
    };

    queue.push(newCustomer);
    customerInput.value = '';
    updateDisplay();
}

// This will Serve next customer
function serveNextCustomer() {
    if (queue.length > 0) {
        currentCustomer = queue.shift();
        updateDisplay();
    } else {
        currentCustomer = null;
        updateDisplay();
        setTimeout(() => {
            alert('No customers in queue');
        }, 60);
    }
}

// Event Listeners
addButton.addEventListener('click', addCustomer);
nextButton.addEventListener('click', serveNextCustomer);

// This to make it If I click at Enter it will add customer
customerInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addCustomer();
    }
});

// Initialize on page load I prefer to use this because it will run when the page is loaded and not when the user clicks on the button 😅 large note sorry Eng
init();
