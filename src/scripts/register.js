import { api } from "../api.js";

export function Register() {

    $("#telephone").click(function(){
        $(this).setCursorPosition(3);
      }).mask("+7 (999) 999-99-99");

    $("#btn-register").click(function () {
        const userData = {
            address: String($("#address").val()),
            fullName: $("#inputName").val(),
            phoneNumber: $("#telephone").val(),
            password: String($("#inputPassword").val()),
            email: String($("#inputEmail").val()),
            birthDate: (`${$("#inputBirthDate").val()}T00:00:00.000Z`),
            gender: $("#inputGender").val() == "Мужской" ? 1 : 0
        };

        if (!CheckValidationData(userData)) return;  

        PostRequestRegister(userData);
    });
}

function PostRequestRegister(userData) {
    fetch(`${api}/api/account/register`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Ошибка");
        })
        .then(json => {
            localStorage.setItem("JWT", json.token);
            location.pathname = "/"
        })
        .catch(err => {
            alert("Ошибка регистрации");
        });
}

function CheckValidationData(userData) {

    if (userData.fullName == "") {
        alert("Введите логин");
        return false;
    }
    else if (userData.fullName.length < 1) {
        alert("ФИО слишком короткое");
        return false;
    }
    
    else if (userData.password == "") {
        alert("Введите пароль");
        return false;
    }
    else if (userData.password.length < 6) {
        alert("Пароль слишком короткий");
        return false;
    }

    else if (userData.email == "") {
        alert("Введите адрес почты");
        return false;
    }
    else if (!userData.email.match(/^\S+@\S+\.\S+$/)) {
        alert("Email неккоректен");
        return false;
    }

    else if (userData.birthDate == "T00:00:00.000Z") {
        alert("Выберете дату рождения");
        return false;
    }
    else if (Date.parse(userData.birthDate) > Date.now()) {
        alert("Дата рождения неккоректна");
        return false;
    }

    else if (userData.name == "") {
        alert("Введите ФИО");
        return false;
    }
    
    return true;
}

$.fn.setCursorPosition = function(pos) {
    if ($(this).get(0).setSelectionRange) {
      $(this).get(0).setSelectionRange(pos, pos);
    } else if ($(this).get(0).createTextRange) {
      var range = $(this).get(0).createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  };