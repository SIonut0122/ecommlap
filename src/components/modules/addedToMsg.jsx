function DisplayAddedToMsg(props) {
    
    // Display 'added to favorite' message
    const alertsContainer = document.getElementById("addedto-alertview");
    let timeout;

    function showAlert() {
    // Creăm alerta
    const alert = document.createElement("div");
    alert.classList.add("favaddedmsg-aview");
    const p = document.createElement('p');
    p.textContent = props.text;
    alert.appendChild(p);
    const i = document.createElement('i');
    i.classList.add(props.iclassname);
    i.classList.add(props.iclassnameSecond);
    alert.appendChild(i);
    const span = document.createElement('span');
    span.classList.add('fa-solid');
    span.classList.add('fa-xmark');
    span.addEventListener('click', hideAlertMsg);
    alert.appendChild(span);
    alertsContainer.appendChild(alert);
    
    function hideAlertMsg() {
        alert.remove();
    }
    // Hide alert
    timeout = setTimeout(() => {
        alert.remove();
    }, 2000);
    }

    console.log(props);
    clearTimeout(timeout);

    // New alert
    showAlert();

    const alerts = alertsContainer.querySelectorAll(".favaddedmsg-aview");
    if (alerts.length > 1) {
    alerts[0].style.animation = "alertAnimation 1s ease-in-out";
    setTimeout(() => {
    alerts[0].remove();
    }, 1000);
    }
}

export default DisplayAddedToMsg;