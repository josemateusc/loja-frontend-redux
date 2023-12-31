import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Button } from "reactstrap";
import { addProdutoNome } from "../redux/slices/carrinho.slice";
import { RootState } from "../redux/store";
import { Produto } from "../redux/slices/produto.slice";
import "./styles/listProduto.css";
import ProductCard from "./ProductCard";

export default function ProdutosList() {
  const dispatch = useDispatch();

  const { produtos } = useSelector((state: RootState) => state.apiProduto);
  const { isAdmin } = useSelector((state: RootState) => state.apiLogin);

  function inserirCarrinho(produto: Produto) {
    dispatch(addProdutoNome(produto));
  }
  
  return (
    <div>
      {isAdmin ? (
        <table className="table table-responsive table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nome</th>
              <th scope="col">Preço</th>
              <th scope="col">Estoque</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto, index) => {
              return (
                <tr key={produto.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{produto.nome}</td>
                  <td>R$ {produto.preco}</td>
                  <td>{produto.estoque}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="grid-cards">
          {produtos.map((produto) => {
            return (
              <ProductCard key={produto.id} produto={produto} inserirCarrinho={inserirCarrinho} />
            );
          })}
        </div>
      )}
    </div>
  );
}
