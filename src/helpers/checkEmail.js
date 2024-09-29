function checkEmail(emailValue) {

    let email = emailValue;
    let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!filter.test(email)) {
    email.focus;
    alert("لطفا بافرمت صحیح ایمیل را واردکنید")
    return false;
 }
}
 export default checkEmail;