let total=0;
function AddNewProduct(event) {
    event.preventDefault();
    const sellPrice = event.target.sellingprice.value-0;
    const prodName = event.target.productname.value;
    const obj = {
        sellPrice,
        prodName
    };
    axios.post("https://crudcrud.com/api/51cd90bce1714541a0435a2d6bc4a0e4/expenseTracker",obj)
    .then((res)=> {
        showNewProductOnScreeen(res.data)
        updateTotal();
        
    })
    .catch((err) =>{
        console.log(err);
    });

};
window.addEventListener("DOMContentLoaded",() =>{
    axios.get("https://crudcrud.com/api/51cd90bce1714541a0435a2d6bc4a0e4/expenseTracker")
    .then ((res)=> {
        let tota =0;
        for(var i=0;i<res.data.length;i++){
            showNewProductOnScreeen(res.data[i]);
             tota =parseInt(res.data[i].sellPrice)+tota;
        }

        displaytotalonscreen(tota);
    })
})




function showNewProductOnScreeen(product){
    document.getElementById('sellprice').value='';      
    document.getElementById('prodName').value='';
    const parentNode = document.getElementById('listOfProducts');
    const childHtml = `<li id=${product._id}>${product.sellPrice} - ${product.prodName}
    <button onclick=deleteProduct('${product._id}') >Delete Product</button> </li>`
    parentNode.innerHTML=parentNode.innerHTML+childHtml;
}


function deleteProduct(productId,prodselpri){
    axios.delete(`https://crudcrud.com/api/51cd90bce1714541a0435a2d6bc4a0e4/expenseTracker/${productId}`)
    .then((res) => {
        removeProductFromScreen(productId);
        updateTotal();


    })
    .catch((err)=>{
        console.log(err)

    })
}
function removeProductFromScreen(productId){
    const ptNode = document.getElementById('listOfProducts');
    const cdNode = document.getElementById(productId);
    if(cdNode){
        ptNode.removeChild(cdNode);
    }
}



function displaytotalonscreen(tot){
    const PNode = document.getElementById('totalValue');
    const cNode = `<p> Total value of the Product(s) : Rs. ${tot}</p>`
     PNode.innerHTML=cNode;
   
}

function updateTotal (){
    axios.get("https://crudcrud.com/api/51cd90bce1714541a0435a2d6bc4a0e4/expenseTracker")
    .then ((res)=> {
        let tota =0;
        for(var i=0;i<res.data.length;i++){
             tota =parseInt(res.data[i].sellPrice)+tota;
        }

        displaytotalonscreen(tota);
    })   
}