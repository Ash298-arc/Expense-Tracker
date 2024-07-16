document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
    
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    function renderExpenses() {
        expenseList.innerHTML = '';
        expenses.forEach((expense, index) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${expense.date}</td>
                <td>${expense.category}</td>
                <td>${expense.description}</td>
                <td>${expense.amount}</td>
                <td class="actions">
                    <button class="edit" data-index="${index}">Edit</button>
                    <button class="delete" data-index="${index}">Delete</button>
                </td>
            `;

            expenseList.appendChild(row);
        });
    }

    function saveExpenses() {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const date = document.getElementById('date').value;
        const category = document.getElementById('category').value;
        const description = document.getElementById('description').value;
        const amount = document.getElementById('amount').value;

        const newExpense = {
            date,
            category,
            description,
            amount
        };

        expenses.push(newExpense);
        saveExpenses();
        renderExpenses();

        expenseForm.reset();
    });

    expenseList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            const index = e.target.dataset.index;
            expenses.splice(index, 1);
            saveExpenses();
            renderExpenses();
        } else if (e.target.classList.contains('edit')) {
            const index = e.target.dataset.index;
            const expense = expenses[index];

            document.getElementById('date').value = expense.date;
            document.getElementById('category').value = expense.category;
            document.getElementById('description').value = expense.description;
            document.getElementById('amount').value = expense.amount;

            expenses.splice(index, 1);
            saveExpenses();
            renderExpenses();
        }
    });

    renderExpenses();
});
