const products = axios.get('https://acme-users-api-rev.herokuapp.com/api/products')
const companies = axios.get('https://acme-users-api-rev.herokuapp.com/api/companies')
const root = document.querySelector('#root')
let e = React.createElement

class App extends React.Component{
    state = {
        companies:[],
        products:[],
        waiting:true
    }
    componentDidMount = () => {
        Promise.all([products, companies])
    .then(([products, companies]) => {
        let productData = products.data.map(product => {
            return product.name
        })
        let companyData = companies.data.map(company => {
            return company.name
        })
        this.setState({
        companies: companyData,
        products: productData,
        waiting:false
        })
    })}
    render(){
    const { companies, products, waiting } = this.state
    if (waiting) return e('div', null, 'waiting.... wait for it')
    const header = e('h1', {className:'header'}, `Acme - We have ${this.state.products.length} Products and ${this.state.companies.length} Companies`)
    console.log(companies, products)
    const htmlStringProducts = products.map((product, idx) => {
        let item = e('li', {key:idx}, product)
        return item
    })
    const htmlStringCompanies = companies.map((company, idx)=> {
        let cList = e('li', {key:idx}, company)
        return cList
    })
    const productList = e('div', {className:'productList'}, htmlStringProducts)
    const companiesList = e('div', {className:'companiesList'}, htmlStringCompanies)
    const listBody = e('div', {className:'body'}, productList, companiesList)
    return e('div', null, header, listBody)
    }
}

ReactDOM.render(
    e(App),
    root,
    () => console.log('I have rendered')
)
