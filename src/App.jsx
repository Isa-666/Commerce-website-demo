import "./App.css";
import Header from "./Components/Header/Header";
import HomePage from "./Pages/HomePage/HomePage";
import Footer from "./Components/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import ProductViewDetails from "./Pages/ProductViewDetails/ProductViewDetails";
import ProductInBasket from "./Pages/BasketPages/ProductsInBasket/ProductInBasket";
import { getAllProducts } from "./Storage/indexDDB";
import FavoritesProduct from "./Pages/Favorites/FavoritesProduct";
import EmptyFavoritePage from "./Pages/EmptyFavoritePage/EmptyFavoritePage";
import EmptyBasketPage from "./Pages/EmptyBasketPage/EmptyBasketPage";
import { MyProvider } from "./Components/Header/Context/CategoryContextAndSearch";
import ProductsPage from "./Pages/ProductsPage/ProductsPage";
import SignUpProfile from "./Pages/SignUpProfile/SignUpProfile";
import ExchangeToken from "./Pages/ExchangeToken/ExchangeToken";
import LoginNext from "./Pages/LoginNext/LoginNext";
import Profile from "./Pages/Profile/Profile";
import Error from "./Pages/Error/Error";
function App() {
  return (
    <>    
    <MyProvider>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/details/:id" element={<ProductViewDetails />} />
            <Route path="/ProductsPage/:slug" element={<ProductsPage />} />
            <Route
              path="/FavoritesProducts"
              element={<FavoritesProduct getAllProducts={getAllProducts} />}
            />
            <Route path="/EmptyFavoritePage" element={<EmptyFavoritePage />} />
            <Route path="/SignUp" element={<SignUpProfile />} />
            <Route path="/login" element={<LoginNext />} />
            <Route path="/BasketProduct" element={<ProductInBasket />} />
            <Route path="/create-token/:token" element={<ExchangeToken />} />
            <Route path="/EmptyBasketProduct" element={<EmptyBasketPage />} />
            <Route path="/user-profile/:tab" element={<Profile />} />
            <Route path="*" element={<Error/>} />
          </Routes>
          <Footer />
        </MyProvider>
   
    </>
  );
}

export default App;
