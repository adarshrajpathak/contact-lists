const addButton=document.getElementById('addButton');
const formContact=document.getElementById('contact-form');
const inputArea=document.getElementsByClassName('container-input');
addButton.addEventListener('click',function(e){
    addButton.classList.toggle('hidden');
    formContact.classList.toggle('hidden');
})

const searchBox=document.getElementById('search-box');
const contactList = document.querySelectorAll('.profile-container');
searchBox.addEventListener('input',function(value){
    console.log(this.value);
    const searchText=this.value.toLowerCase();
    contactList.forEach(function (contact) {
        const fullName = contact.querySelector('.fullName').textContent.toLowerCase();
        if (fullName.includes(searchText)) {
            contact.style.display = 'flex';
        } else {
            contact.style.display = 'none';
        }
    });
})