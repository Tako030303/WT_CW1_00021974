document.addEventListener('DOMContentLoaded', ()=>{ //ensures that JS will run after HTML and CSS load
const add = document.querySelectorAll('.add'); // for hiding dividers in main.html faq section
    add.forEach(e => {
        e.addEventListener('click', ()=>{
            const p = e.previousElementSibling.lastElementChild; // <p> with answer
            const itemadd=e.firstElementChild; //  'plus' element
            const itemerase = e.lastElementChild; // 'minus' element

            e.classList.toggle('none');
            itemadd.classList.toggle('hide');
            itemerase.classList.toggle('hide');
            p.classList.toggle('show')
        })
    });


//Sidebar button (only mobile) event listener
const sidebtn = document.getElementById('menuButton');
const sidebar = document.getElementById('sidebar');
sidebtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        sidebtn.classList.toggle('open');
});


//Form validation
const form = document.querySelectorAll("form");
form.forEach((element) => {
    element.addEventListener('submit', (e)=>{
        e.preventDefault();
        //Flag for checking if there is any error
        let flag = true;

        //Getting input objects
        const name = element.name;
        const email = element.email;
        const phone = element.phone;
        const message = element.message;

        // Creating objects to hold error tooltip
        let nameError = document.getElementById("n-error");
        let emailError = document.getElementById("e-error");
        let phoneError = document.getElementById("p-error");
        let messageError = document.getElementById("m-error");

        //Function to create if it is not created yet (first load)
        function createPlaceholder(inputName, errorName, errorID){
            if (!errorName){ // if tooltip is not created yet
                errorName = document.createElement("small");
                errorName.className = "error";
                errorName.id = errorID;
                inputName.parentNode.insertBefore(errorName, inputName.nextSibling);
            }
            return errorName;
        }
        nameError = createPlaceholder(name, nameError, "n-error");
        emailError = createPlaceholder(email, emailError, "e-error");
        phoneError = createPlaceholder(phone, phoneError, "p-error");
        messageError = createPlaceholder(message, messageError, "m-error");

        //Function to validate empty input
        function checkIfEmpty(value, errorPlaceholder, type){
            if (value===""){
                errorPlaceholder.textContent = type + " can not be empty.";
                errorPlaceholder.style.display = "block";
                flag = false;
            } else{
                errorPlaceholder.style.display = "none";
            }
        }
        checkIfEmpty(name.value.trim(), nameError, "Name field");
        checkIfEmpty(message.value.trim(), messageError, "Message field");

        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        const phonePattern = /^[0-9\+\(\)\.\s\-,]+$/;

        //Email validation
        if (!emailPattern.test(email.value)){
            emailError.textContent = "Enter a valid email adress.";
            emailError.style.display = "block";
            flag = false;
        } else {
            emailError.style.display = "none";
        }

        //Phone validation
        if (!phonePattern.test(phone.value)){
            phoneError.textContent = "Enter a valid phone number.";
            phoneError.style.display = "block";
            flag = false;
        } else {
            phoneError.style.display = "none";
        }
    
        // If everything is right
        if (flag) {
            element.requestSubmit();             //requestSubmit() prevents page reload
            name.value = "";
            email.value = "";
            phone.value = "";
            message.value = "";
            popUp = document.querySelector(".form-creation"); //popup notification for form submition
            popUp.style.display = "block";
            setInterval(() => {
                // For CSS transition         
            }, 500);
            popUp.classList.toggle("show");
            setTimeout(() => {
                popUp.classList.remove("show");
            }, 3000);
            setTimeout(() => { // For CSS transition
                popUp.style.display = "none"; 
            }, 500);
        }
    })
})

//Review.html buttons
//Try will handle errors when opened on other pages
try{

//Getting button objects
const leftBtn = document.querySelector(".left-arrow");
const rightBtn = document.querySelector(".right-arrow");


//Adding onclick event
leftBtn.addEventListener("click", moveleft);
rightBtn.addEventListener("click", moveright);

//Current quote index
let cur = 0;

//Database
const reviewsArray = [
    { quote: "Amazing experience at Fabias Cafe, the food was fantastic, and the ambiance was perfect! Will definitely come back with friends!", author: "Alice Johnson" },
    { quote: "Great service at Fabias Cafe with incredibly friendly staff who made me feel right at home. A wonderful place to relax and enjoy a coffee.", author: "Michael Smith" },
    { quote: "The quality of both the food and drinks at Fabias Cafe exceeded my expectations. I was pleasantly surprised by how fresh everything tasted!", author: "Emily Davis" },
    { quote: "Fabias Cafe offers good value for the price paid. The portions were generous, and the taste was simply delightful. Highly recommended!", author: "David Brown" },
    { quote: "Highly recommend Fabias Cafe to anyone looking for quality food, a cozy atmosphere, and friendly service. It's definitely worth a visit!", author: "Sophia Wilson" },
    { quote: "Fabias Cafe was not exactly what I expected, but I ended up being very happy with the experience. The staff was attentive, and the food was delicious!", author: "Chris Martinez" },
    { quote: "Fantastic atmosphere at Fabias Cafe! The interior is well-designed, and the cozy vibes make it a great spot for spending an afternoon with friends.", author: "Olivia Garcia" },
    { quote: "Customer support at Fabias Cafe was incredibly helpful. They made sure everything was perfect, and I truly appreciated their attention to detail.", author: "James Lee" },
    { quote: "The product I ordered at Fabias Cafe arrived earlier than expected, and the quality was outstanding. Couldn't ask for better service!", author: "Linda Thompson" },
    { quote: "Would definitely visit Fabias Cafe again. The food, service, and overall experience were top-notch. Can't wait to come back!", author: "Daniel Harris" }
  ];


function moveleft(){
    const citation = document.querySelector("#citation");
    const person = document.querySelector("#person");
    const container = document.querySelector("#container")
    cur-=1;
    if (cur<0) cur=9;
    container.style.opacity = 0;
    setTimeout(() => { //For CSS transition
        citation.innerHTML = reviewsArray[cur]["quote"];
        person.innerHTML = reviewsArray[cur]["author"];
        container.style.opacity = 1;
    }, 300);
}
function moveright(){
    const citation = document.querySelector("#citation");
    const person = document.querySelector("#person");
    const container = document.querySelector("#container")
    cur+=1;
    if (cur>=10) cur=0;
    container.style.opacity = 0;
    setTimeout(() => { //For CSS transition
        citation.innerHTML = reviewsArray[cur]["quote"];
        person.innerHTML = reviewsArray[cur]["author"];
        container.style.opacity = 1;
    }, 300);
}
} catch (err) {}

});