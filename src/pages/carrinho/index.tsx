import { useDispatch, useSelector } from "react-redux";
import { ListGroup } from "reactstrap";
import NavBarCustom from "../../components/navbar";
import { RootState } from "../../redux/store";
import "./index.css";
import{
  incrementProduct,
  decrementProduct,
  removeProduct,
  tipoCarrinho,
} from "../../redux/slices/carrinho.slice";

export default function Carrinho() {
  const produto = useSelector((state: RootState) => state.carrinho);
  const dispatch = useDispatch();

  const sumValue = () => {
    let sum = 0;
    produto.produtos.forEach((item) => {
      sum += item.produto?.preco * item.count;
    })
    return sum;
  }

  const handleRemove = (item: tipoCarrinho) => {
    dispatch(removeProduct(item.produto))
  }

  const handleDecrement = (item: tipoCarrinho) => {
    if (item.count > 1) {
      dispatch(decrementProduct(item.produto));
    } else {
      handleRemove(item);
    }
  };

  const handleIncrement = (item: tipoCarrinho) => {
    if(item.count < item.produto.estoque){
      dispatch(incrementProduct(item.produto));
    } else{
      alert("Você está pedindo uma quantidade maior do que temos no estoque")
    }
  }

  return (
    <div className="containerCart">
      <div style={{ width: "100%" }}>
        <NavBarCustom />
      </div>
      <h2>CARRINHO</h2>


      <div>
        <h2>Valor Total: R$ {sumValue().toFixed(2)}</h2>
      </div>
      <div>
        <ListGroup flush>
          {produto.produtos.map((item) => {
            return (
              <table className="table table-responsive table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Preço</th>
                    <th scope="col">Quantidade</th>
                    <th scope="col">Remover</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{item.produto.nome}</td>
                    <td>R$ {item.produto.preco.toFixed(2)}</td>
                    <td>
                      <button
                        className="btn"
                        onClick={() => handleDecrement(item)}
                      >

                        -

                      </button>
                      <span>{item.count}</span>
                      <button
                        className="btn"
                        onClick={() => handleIncrement(item)}
                      >
                        +
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleRemove(item)}
                        className="btn remove-btn"
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            );
          })}
        </ListGroup>
      </div>

  
    </div>
  );
}
