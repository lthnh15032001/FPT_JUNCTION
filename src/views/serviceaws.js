// const { default: axios } = require("axios");
const getInfoOrg = async () => {
    let resource = document.getElementById('resource')
    let usrElement = document.getElementById('usr')
    let region = document.getElementById('region')
    let ul = document.getElementById('media-list')
    let ul2 = document.getElementById('media-list-2')
    let ul4 = document.getElementById('media-list-4')
    try {
        const orgInfoAccount = await axios.get('/getInfoOrg/account_id')
        usrElement.innerText = orgInfoAccount.data.length
        for (let i = 0; i < orgInfoAccount.data.length; i++) {
            ul.appendChild(creatCard(orgInfoAccount.data[i], i, "ID"))
        }

        const orgInfoService = await axios.get('/getInfoOrg/service')
        resource.innerText = orgInfoService.data.length
        for (let i = 0; i < orgInfoService.data.length; i++) {
            ul2.appendChild(creatCard(orgInfoService.data[i], i, "ID"))
        }

        const orgInfoRegion = await axios.get('/getInfoOrg/region')
        region.innerText = orgInfoRegion.data.length
        for (let i = 0; i < orgInfoRegion.data.length; i++) {
            ul4.appendChild(creatCard(orgInfoRegion.data[i], i, "ID"))
        }
        // return orgInfo.data
    } catch (e) {
        console.log({ e: e })
    }

}
const getCosts = async () => {
    try {
        const orgInfoAccount = await axios.get('costs/reports/2361/costs')
        let costtotal = document.getElementById('costtotal')
        costtotal.innerText = "$" + parseFloat(orgInfoAccount.data.total).toFixed(2);
        const costs = orgInfoAccount.data.costs;
        let counts = {}
        costs.forEach((x) => {
            counts[x.service] = (counts[x.service] || 0) + 1;
        });
        let list = document.getElementById('media-list-3')
        let obj = Object.entries(counts)
        let i = 0
        obj.forEach(x => {
            const format = {
                label: x[0],
                value: x[1]
            }
            list.appendChild(creatCard(format, i, "Accrued Counts"))
            i++
        })
    } catch (e) {
        console.log({ e: e })
    }
}
const creatCard = (orgInfoAccount, i, label) => {
    let div1 = document.createElement("li") // <div> </div>
    div1.className = "media mb-2"
    div1.innerHTML = `<li class="media mb-2">
        <a href="#" class="mr-4">
           ${i + 1}.
        </a>
        <div class="ul-task-manager__media">
            <a href="#">${orgInfoAccount.label ? orgInfoAccount.label : "No Name"}</a>
            <div class="font-size-sm text-muted">${label}: ${orgInfoAccount.value}</div>
        </div>
        <div class="ml-3 align-self-center">
            <span class="badge badge-mark"></span>
        </div>
    </li>`
    return div1;
}
getInfoOrg()
getCosts()