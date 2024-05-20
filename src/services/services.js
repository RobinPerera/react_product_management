import Axios from "axios"

const baseURL = "http://localhost:8089/products"

export function getAllProducts(sortchoice) {
    const data = Axios.get(`${baseURL}/sort/${sortchoice}`)

    return data

}
export function getproduct(id) {

    return Axios.get(`${baseURL}/view/${id}`)
}


export function insertProduct(empObject) {
    return Axios.post(`${baseURL}/add`, empObject)
}


export function deleteProduct(id) {
    return Axios.delete(`${baseURL}/delete/${id}`)

}



export function updateProduct(empObject, id) {


    return Axios.put(`${baseURL}/update/${id}`, empObject)
}