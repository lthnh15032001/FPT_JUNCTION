// const { default: axios } = require("axios");
const getInfoOrg = async () => {
    let resource = document.getElementById('resource')
    let usrElement = document.getElementById('usr')
    let ul = document.getElementById('media-list')
    let ul2 = document.getElementById('media-list-2')
    try {
        const orgInfoAccount = await axios.get('/getInfoOrg/account_id')
        const orgInfoService = await axios.get('/getInfoOrg/service')
        usrElement.innerText = orgInfoAccount.data.length
        for (let i = 0; i < orgInfoAccount.data.length; i++) {
            ul.appendChild(creatCard(orgInfoAccount.data[i], i))
        }

        resource.innerText = orgInfoService.data.length
        for (let i = 0; i < orgInfoService.data.length; i++) {
            ul2.appendChild(creatCard(orgInfoService.data[i], i))
        }
        // return orgInfo.data
    } catch (e) {
        console.log({ e: e })
    }

}
const account_aws = () => {
    console.log("dat")
}
const creatCard = (orgInfoAccount, i) => {
    let div1 = document.createElement("li") // <div> </div>
    div1.className = "media mb-2"
    div1.innerHTML = `<li class="media mb-2">
        <a href="#" class="mr-4">
           ${i + 1}.
        </a>
        <div class="ul-task-manager__media">
            <a href="#">${orgInfoAccount.label ? orgInfoAccount.label : "No Name"}</a>
            <div class="font-size-sm text-muted">ID: ${orgInfoAccount.value}</div>
        </div>
        <div class="ml-3 align-self-center">
            <span class="badge badge-mark"></span>
        </div>
    </li>`
    return div1;
}
getInfoOrg()