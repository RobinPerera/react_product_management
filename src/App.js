
import './App.css';
import AddProduct from './componenets/addProduct/AddProduct';
import GetPoducts from './componenets/getProducts/GetProduct';
import HomePage from './componenets/homePage/Home';
// import Navbar from './componenets/navbar/navbar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GetSingleProdcut from './componenets/viewProduct/GetSingllProduct';
import Login from './componenets/loginpage/Login';
import { legacy_createStore } from 'redux';
import { Provider } from 'react-redux';
import Registration from './componenets/registration/Registration';
import { useState } from 'react';


const initialState = {
  products: [],
};

const rootReducer = (state = initialState, action) => {

};

const store = legacy_createStore(rootReducer);





function App() {


  return (
    <div className="App">
      <Provider store={store}>


        <Router>
          <div>

            <Routes>
              <Route path="/" element={<HomePage />} />

              <Route path="/products" element={<GetPoducts />} />

              <Route path="/addProduct" element={<AddProduct />} />
              <Route path="/addProduct/:productId" element={<AddProduct />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/view/:productId" element={<GetSingleProdcut />} />
            </Routes>
          </div>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
