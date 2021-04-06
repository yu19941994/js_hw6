let data = []

const tripMenu = document.querySelector('#tripMenu')
const areaSearch = document.querySelector('#areaSearch')
const searchTimes = document.querySelector('#searchTimes')
const submitBtn = document.querySelector('#submitBtn')
// 表單資訊
const formName = document.querySelector('#name')
const formUrl = document.querySelector('#url')
const formArea = document.querySelector('#area')
const formprice = document.querySelector('#price')
const formGroup = document.querySelector('#group')
const formrate = document.querySelector('#rate')
const formDescription = document.querySelector('#description')

let totalContent = ''
let searchTotal = 0

function getData () {
  axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json')
    .then(res => {
      console.log(res.data)
      data = res.data.data
      init()
    })
    .catch(err => console.log(err))
}

function printMenu (data) {
  totalContent = ''
  searchTotal = 0
  data.forEach(item => {
    totalContent += `<li class="col-12 col-md-6 col-lg-4 mb--7 position-relative">
                        <p class="bg--secondary mb-0 text-white py-2 px--7 width--tag position-absolute z-index--100 top font--1">${item.area}</p>
                        <div class="card">
                          <img src="${item.imgUrl}" class="card-img-top" alt="menu1">
                          <div class="card-body position-relative">
                            <div class="d-flex flex-column justify-content-between height--inside">
                              <div>
                                <p class="bg--primary mb-0 text-white py-1 px-2 width--tag--sm position-absolute z-index--100 top left">${item.rate}</p>
                                <h5 class="card-title border-bottom--primary"><a href="#" class="text-decoration-none text--primary">${item.name}</a></h5>
                                <p class="card-text text--gray">${item.description}</p>
                              </div>
                              <div class="d-flex justify-content-between align-items-center">
                                <div class="d-flex">
                                  <span class="material-icons text--primary">
                                    error
                                  </span>
                                  <p class="text--primary mb-0">剩下最後 ${item.group} 組</p>
                                </div> 
                                <div class="d-flex align-items-center">
                                  <p class="text--primary mb-0">TWD</p>
                                  <p class="text--primary mb-0 h2">$${item.price}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>`
  })
  tripMenu.innerHTML = totalContent

  searchTotal = data.length
  searchTimes.innerHTML = `<p class="h6 mb-0 text--gray">本次搜尋共 ${searchTotal} 筆資料</p>`
}

function init () {
  printMenu(data)
}

function showMenu (chosenarea) {
  let filterData

  if(chosenarea === '全部地區') {
    filterData = data
  }else{
    filterData = data.filter(e => e.area === chosenarea)
  }
  printMenu(filterData)
}

function clearForm () {
  formName.value = ''
  formUrl.value = ''
  formArea.value = ''
  formprice.value = ''
  formGroup.value = ''
  formrate.value = ''
  formDescription.value = ''
}

function searchHandler (e) {
    showMenu(e.target.value)
}

function addMenu (e) {
  e.preventDefault()
  let obj = {}
  obj.area = formArea.value
  obj.rate = formrate.value
  obj.name = formName.value
  obj.description = formDescription.value
  obj.group = formGroup.value
  obj.price = formprice.value
  obj.imgUrl = formUrl.value
  if(obj.area === '' || obj.rate === '' || obj.name === '' || obj.description === '' || obj.group === '' || obj.price === '' || obj.imgUrl === '') {
    alert('您有空格尚未填寫')
  }else{
    data.push(obj)
    clearForm()
    init()
  }
}

areaSearch.addEventListener('change', searchHandler);
submitBtn.addEventListener('click', addMenu)

getData()