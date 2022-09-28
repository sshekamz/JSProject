// network call 
async function saveToCrud(event){
    event.preventDefault();
    const amount = event.target.amt.value;
    const category = event.target.cat.value;
    const description = event.target.desc.value;

    const obj={
        amount,
        category,
        description
    };
    //console.log(obj);
    
    try {
        let post= await axios.post("https://crudcrud.com/api/869f7f9c0a504b748b949b1f7e169432/expenseTracker",obj)
        showExpense(post.data);
    } catch (error) {
        console.log(error);
    }    
}

//
window.addEventListener("DOMContentLoaded", async () => {
  
    try {
        let getData = await axios.get("https://crudcrud.com/api/869f7f9c0a504b748b949b1f7e169432/expenseTracker")
        for(let i=0;i<getData.data.length;i++){
            showExpense(getData.data[i]);
        }

    } catch (error) {
        console.log(error);
    }
    
   
   
   // .then((get)=>{
    // //console.log(response.data);
    //      for(var i=0;i<response.data.length;i++){
    //         showExpense(response.data[i]);
    //      }
    // })
    // .catch((err)=>console.log(err))
    
})

function showExpense(expense){
    document.getElementById('amt').value='';
    document.getElementById('cat').value='';
    document.getElementById('desc').value='';

    //console.log(expense);

    const parentNode=document.getElementById('expenseList');
    const childHTML=`<li id=${expense._id}> ${expense.amount} - ${expense.category} - ${expense.description}
                     <button onclick=deleteExpense('${expense._id}')> Delete</button>
                     <button onclick=editExpense('${expense._id}','${expense.amount}','${expense.category}','${expense.description}')> Edit</button>
                     </li>`

    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

// function editExpense(expID,expAmount,category,description){
//     document.getElementById('amt').value=expAmount;
//     document.getElementById('cat').value=category;
//     document.getElementById('desc').value=description;

//     //console.log(expID);
//     deleteExpense(expID);

//   }

  async function deleteExpense(expId){

    let deletep= await axios.delete(`https://crudcrud.com/api/869f7f9c0a504b748b949b1f7e169432/expenseTracker/${expId}`)
    try {
        removeExpenseFromScreen(expId)
    } catch (error) {
        console.log(error);
    }

}
function removeExpenseFromScreen(expId){
    const parentNode = document.getElementById('expenseList');
    const childNodeToBeDeleted = document.getElementById(expId);
    if(childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted)
    }
}

//put call using id

async function editExpense(expID,expAmount,category,description){

    const newObj={
       amount: document.getElementById('amt').value=expAmount,
       category:document.getElementById('cat').value=category,
       description :document.getElementById('desc').value=description
    }
    //let update= await axios.put(`https://crudcrud.com/api/869f7f9c0a504b748b949b1f7e169432/expenseTracker/${expID}`,newObj)
    try {
        deleteExpense(expID)
        //console.log(update.data);
    } catch (error) {
        console.log(error);
}
}
//show expense