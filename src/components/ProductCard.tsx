import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "reactstrap";
import { addProduct } from "../redux/slices/carrinho.slice";
import { Produto } from "../redux/slices/produto.slice";

interface ProdutoCardProps {
  produto: Produto;
  inserirCarrinho: (produto: Produto) => void;
}

const ProdutoCard: React.FC<ProdutoCardProps> = ({ produto, inserirCarrinho }) => {
  const dispatch = useDispatch();

  function handleInserirCarrinho(produto: Produto) {
    dispatch(addProduct(produto));
  }

  return (
    <div className="card">
      <h4>{produto.nome}</h4>
      <p>Preço: R$ {produto.preco}</p>
      <p>Estoque: {produto.estoque}</p>
      <Button className="btn-add-cart" onClick={() => handleInserirCarrinho(produto)}>
        Inserir no Carrinho
      </Button>
    </div>
  );
};

export default ProdutoCard;
