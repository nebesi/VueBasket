const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

let vm = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        containerData: '.products',
        products: [],
        goods: [],
        img: 'https://santehmag.com.ua/image/cache/catalog/import_yml/SD0/003/724/6/no-img-200x200.jpg',
        searchWord: '',
        filtered: '',
        isVisibleCart: false,
        emptyCart: 'корзина пуста'

    },
    methods: {

        getJson(url) {
            return fetch(url)
                .then(data => data.json())
        },

        addProduct(el) {
            console.log(el)
        },

        startFilter() {
            let nodes = document.querySelectorAll('.product-item');
            if(this.searchWord.length === 0) {
                nodes.forEach(element => element.style.display = "block")
                return;
            }
            else {
                let search = new RegExp(`${this.searchWord}`, 'i')
                let finder = this.products.find(el => el.product_name.match(search));
                if(!finder) return

                nodes.forEach(element => {
                    if(element.dataset.name !== finder.product_name) {
                        element.style.display = "none"
                    }
                })
            }
        },

        filtr(ev) {
            console.log(ev)
        }

    },
    mounted () {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data) {
                    this.products.push(el)
                }
            });

        this.getJson(`getProducts.json`)
            .then(data => {
                for(let el of data) {
                    this.products.push(el)
                }
            });
    }
})