const firebaseConfig = {
    apiKey: "AIzaSyDYhbQqIX1mcPI0gNEDJkzgwehyrwxF2aI",
    authDomain: "fabiola-sitecurriculo.firebaseapp.com",
    projectId: "fabiola-sitecurriculo",
    storageBucket: "fabiola-sitecurriculo.appspot.com",
    messagingSenderId: "281511209465",
    appId: "1:281511209465:web:118b9fe73ff7b2fca53528",
    measurementId: "G-YHWMSYRN7B",
  };
  
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  $("#t-contact-form").on("submit", (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
  
    let name = $("#name").val();
    let email = $("#email").val();
    let subject = $("#subject").val();
    let message = $("#message").val();
  
    // console.log("send message", {
    //   name,
    //   email,
    //   subject,
    //   message,
    // });
    firebase
      .firestore()
      .collection("mail")
      .add({
        to: "atendimento@aposaude.com.br",
        replyTo: email,
        message: {
          subject: "Novo contato APO Seguros",
          html: `Contato enviado pelo formulário da Landing Page.
           <br><br>
           Nome: ${name}<br>
           Email: ${email}<br>
           Assunto: ${subject}<br>
           Mensagem: ${message}<br>
           <br><br>`,
        },
      })
      .then((res) => {
        // console.log({
        //   res,
        // });
        $("#name").val("");
        $("#email").val("");
        $("#subject").val("");
        $("#message").val("");
        document.querySelector("#form-loading").classList.remove("d-block");
        $("#form-success").show();
      })
      .catch((error) => {
        document.querySelector("#form-loading").classList.remove("d-block");
        // console.log({
        //   error,
        // });
      });
  });
  