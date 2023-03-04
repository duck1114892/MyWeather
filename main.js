var country = document.querySelector('.country');
var city = document.querySelector('.city');
var time = document.querySelector('.timeSetDay');
var icon = document.querySelector('.icon-weather');
var temp = document.querySelector('.temp');
var visionV = document.querySelector('.vision-value');
var windV = document.querySelector('.wind-value');
var uvV = document.querySelector('.uv-value');
var cloud = document.querySelector('.cloud-value');
var inputBox = document.querySelector('.input-box');
var loginBox = document.querySelector('.login-box');
var tiClose = document.querySelector('.ti-close');
var openLogin = document.querySelector('.open-login');
var userValue = document.querySelector('.user-value');
var passwordValue = document.querySelector('.password-value');
var inputBtn = document.querySelector('.input-btn');
var showName = document.querySelector('.username')
var notify = document.querySelector('.notifi')
var changetile = document.querySelector('.open-login span')
var signUp = document.querySelector('.signUp-btn')
var loginBody = document.querySelector('.login-body')
var body = document.querySelector('body')
var warning = document.querySelector('.warning')
//Api
async function addApi(changeApi) {
    var link = `http://api.weatherapi.com/v1/current.json?key=3406c809ed2b486785920920223012&q=${changeApi}&aqi=no`
    var getData = await fetch(link)
        .then(function (res) {
            return res.json()
        })
    console.log(getData)
    country.innerText = `${getData.location.country}`
    city.innerText = `${getData.location.name} `;
    var templ = temp.innerText = getData.current.temp_c;
    time.innerText = getData.location.localtime;
    icon.innerHTML = `<img src="${getData.current.condition.icon}">`
    visionV.innerText = `${getData.current.vis_km} km`
    windV.innerText = `${getData.current.wind_kph} kph`
    uvV.innerText = `${getData.current.uv}`
    cloud.innerText = `${getData.current.cloud}`
    if (templ <= 19) {
        body.setAttribute('class', 'cold')
    }
    if (templ > 25) {
        body.setAttribute('class', 'hot')
    }
    if (templ > 19 && templ <= 25) {
        body.setAttribute('class', 'warm')
    }
}
addApi('Ho Chi Minh')
inputBox.addEventListener('keypress', function (e) {
    if (e.code === 'Enter') {
        var changeApi = inputBox.value.trim();
        addApi(changeApi)
        inputBox.value = ' '
    }
})

// Login
async function Login() {
    var linkUser = 'http://localhost:3000/info'
    var data = await fetch(linkUser)
        .then(function (res) {
            return res.json()
        })
        .catch(function () {

            loginBody.classList.add('hide')
            warning.classList.add('open')
            warning.innerText = 'Không có Data User'
        })


    inputBtn.addEventListener('click', activeApi)
    
    function activeApi() {
        var userForm = userValue.value.trim()
        var passwordForm = passwordValue.value.trim()

        for (let i = 0; i <= data.length; i++) {
            var checkName = data[i].name
            var checkPassword = data[i].password
            if (userForm == checkName && passwordForm == checkPassword) {
                showName.innerText = `Xin chào Người Dùng ${data[i].name}`;
                changetile.innerText = data[i].name
                addApi(data[i].weather)
                setTimeout(() => {
                    closeBox()
                    showTitle()
                    hideNotify()
                    inputBtn.innerText = 'Đăng Xuất'
                    inputBtn.addEventListener('click', function () {
                        location.reload()
                    })
                }, 2000);
                notify.innerText = `Đăng nhập thành công`;
                stopPropagation()
            }
            else {
              notify.innerText ='Sai tên đăng nhập hoặc mật khẩu'
              setTimeout(function(){
                  hideNotify()
             notify.innerText = '   '
              },1000)
              showNotify()
            }
        }
    }
}


//signup 
signUp.addEventListener('click', function () {
    location.href = '/dang_ky/index.html'
})

// Dong mo menu
tiClose.addEventListener('click', closeBox)
tiClose.addEventListener('click', showTitle)

openLogin.addEventListener('click', openBox)
openLogin.addEventListener('click', hideTitle)

//ham
function hideLogin() {
    loginBody.classList.add('hide')
}
function openBox() {
    loginBox.classList.remove('close')
}
function closeBox() {
    loginBox.classList.add('close')
}
function showTitle() {
    openLogin.classList.remove('close')
}
function hideTitle() {
    openLogin.classList.add('close')
}
function showNotify() {
    notify.classList.remove('close')
}
function hideNotify() {
    notify.classList.add('close')
}
Login()

