import { ProdutoModel } from '../../../vender-produto/model/produto.model';

export class CarrinhoModel {
    userId?: string;
    key?: string;
    produtos: ProdutoModel[] = [];
    quantidade: number = 0;
}