function login(){
    let user,pass;

    user = document.getElementById("usuario").value;
    pass = document.getElementById("contraseña").value;

    if(user == "CLIENTE" && pass == "1234"){
        window.location= "cliente.html";
    }else{
        alert("CONTRASEÑA INCORRECTA")
    }

}
