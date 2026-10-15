const form=document.getElementById('contactForm');
const errorText=document.getElementById('error');
form.addEventListener('submit',function(e){
 e.preventDefault();
 const name=document.getElementById('name').value.trim();
 const email=document.getElementById('email').value.trim();
 const message=document.getElementById('message').value.trim();
 const emailPattern=/^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
 if(!name||!email||!message){errorText.textContent="⚠️ All fields are required!";errorText.style.color="#ef4444";return;}
 if(!email.match(emailPattern)){errorText.textContent="⚠️ Enter valid email (e.g. emmanuel@gmail.com)";errorText.style.color="#ef4444";return;}
 errorText.style.color="green";
 errorText.textContent="✅ Thanks "+name+"! Your message is validated. To actually reach me, email: emmanuelkimtai04@gmail.com";
 form.reset();
 setTimeout(()=>{errorText.textContent=""; errorText.style.color="#ef4444";},5000);
});