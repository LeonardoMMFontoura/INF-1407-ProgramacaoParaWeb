function ValidarEmail(form) 
{
    email = form.inputbox.value;
    if (/\\[bcdfghjklmnpqrstvwxyz]+\[[bcdfghjklmnpqrstvwxyz]+(\|[bcdfghjklmnpqrstvwxyz]+)*]/i.test(email))
  {

    alert("Email válido");
    window.location.href = "../HTML/menu.html";
    return (true)

  }
  else{
    alert("Você inseriu um e-mail inválido!")
    return (false)
  }
}