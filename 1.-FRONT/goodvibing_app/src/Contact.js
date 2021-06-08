import Helmet from "react-helmet";

function Contact() {
  return (
    <div className="contact">
      <h1>Conócenos, ¿hablamos?</h1>
      <Helmet>
        <title></title>
      </Helmet>
      
    </div>
  );
}

export default Contact;


<section class="containerWe">
<div class="cajaBea"> <img src="BeaUnicornRedi3.png"> Bea Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel neque eget lectus mollis varius interdum at nunc. In tristique sem vitae eleifend maximus. Nunc gravida eu urna vitae facilisis. Fusce scelerisque neque eu orci commodo, sed placerat felis dapibus. Mauris molestie, turpis id pretium porta, odio nisl pharetra nunc, nec ornare tortor enim sed mauris.</div>
<div class="cajaLaura"><img src="LauraCupcakeRedi3.png"> Laura Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel neque eget lectus mollis varius interdum at nunc. In tristique sem vitae eleifend maximus. Nunc gravida eu urna vitae facilisis. Fusce scelerisque neque eu orci commodo, sed placerat felis dapibus. Mauris molestie, turpis id pretium porta, odio nisl pharetra nunc, nec ornare tortor enim sed mauris.</div>
</section>

<section class="formContact">
<form action="Formulario de Contacto" method="POST">
    <ul>
        <li>
            <label for="name">Tu nombre</label>
            <input type="text" id="name" name="user_name">
        </li>
        <li>
            <label for="mail">Tu mail</label>
            <input type="email" id="mail" name="user_mail">
         </li>
         <li>
             <label for="msg">Tu mensaje</label>
             <textarea id="msg" name="user_message"></textarea>
         </li>
    </ul>
    <a class="botonEnvia"><button>Envía</button></a>
</form>
</section>