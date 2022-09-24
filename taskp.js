
function saveToLocalStorage(event) {
    event.preventDefault();
    //console.log("correct");
    const amount = event.target.exp.value;
    const category = event.target.cat.value;
    const description = event.target.desc.value;

    const obj = {
      amount,
      category,
      description,
    };
    axios.post("https://crudcrud.com/api/403d8f1de5a14f03afd458bae9ea1e49/expenseData",obj)
    .then((response)=>{
        showExpense(response.data);;
    })
    .catch((err)=>console.log(err))
    
  }
  window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/403d8f1de5a14f03afd458bae9ea1e49/expenseData")
    .then((response)=>{
    
         for(var i=0;i<response.data.length;i++){
            showExpense(response.data[i]);
         }
    })
    .catch((err)=>console.log(err))
  })
  function showExpense(expense){
    document.getElementById('exp').value='';
    document.getElementById('cat').value='';
    document.getElementById('desc').value='';

    // if(localStorage.getItem(expense.description)!==null){
    //     removeExpense(expense.description)
    //}
    const parentNode=document.getElementById('expenseList');
    const childHTML=`<li id=${expense._id}> ${expense.exp} - ${expense.cat} - ${expense.desc}
        <button onclick=deleteExpense('${expense._id}')> Delete</button>
        <button onclick=editExpense('${expense._id}','${expense.amount}', '${expense.category}','${expense.description}')> Edit</button>`

        parentNode.innerHTML = parentNode.innerHTML + childHTML;
  }

  // Edit User
  function editExpense(expId,expAmount,expCategory,expDescription){
    document.getElementById('exp').value=expAmount;
    document.getElementById('cat').value=expCategory;
    document.getElementById('desc').value=expDescription;

    deleteExpense(expId);
    console.log('correct');
  }

  //delete Expense
  function deleteExpense(expID){
    axios.delete(`https://crudcrud.com/api/403d8f1de5a14f03afd458bae9ea1e49/expenseData/${expID}`)
    .then((response)=>{
        removeExpense(expID);
    })
    .catch((err)=>console.log(err))
  }

  function removeExpense(expId){
    const parentNode=document.getElementById('expenseList');
    const childNodeToBeDeleted=document.getElementById(`${expId}`);
    if(childNodeToBeDeleted){
        parentNode.removeChild(childNodeToBeDeleted);
        console.log('correct');
    }
  }

