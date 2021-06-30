const BASE_API = 'https://azurenagpapp.azurewebsites.net/Inventory'
$(document).ready(function(){
    
    $("#submit").click(function () {
        const itemName = document.getElementById("itemName").value;
        const price = document.getElementById("price").value;
        //console.log(itemName,price);
        PostData(itemName , price);
        });

    async function getItems(done) {
        const resp = await fetch(BASE_API, { 
            method: 'GET' 
        })
        const items = await resp.json()
        done(items)
    }
  
    async function PostData(itemName , price){
        price = parseFloat(price);
        const resp = await fetch(BASE_API, { 
            method: 'POST' ,        
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ itemName, price})  
        })
        alert(itemName + "added successfully Refresh page to see")
    }
   
    async function deleteItem(id , done){
        const resp = await fetch(BASE_API+"/"+id, { 
            method: 'DELETE' 
        })        
        done()
    }
    function getAllItems(){
        let tbody= document.getElementById("items");
        getItems(function(items){
            items.forEach(item => {
                let tr = document.createElement('tr');
                tr.id = item.itemName; 
                const tdName = document.createElement('td');
                const tdPrice = document.createElement('td');
                const deletebutton = document.createElement('button');
                const id = item.id
                deletebutton.onclick = ()=>deleteItem(id ,function(){
                    const elementtoDelete = document.getElementById(item.itemName);
                    elementtoDelete.parentNode.removeChild(elementtoDelete);
                    console.log("ElementToDelete",elementtoDelete)
                })
                deletebutton.textContent = "Delete";
                deletebutton.className = "btn btn-danger"
                tdName.textContent = item.itemName
                tdPrice.textContent = item.price
                tr.appendChild(tdName);
                tr.appendChild(tdPrice);
                tr.appendChild(deletebutton);                
                tbody.appendChild(tr);
                //console.log(item)
            });              
         
        })
    }
    getAllItems();

});