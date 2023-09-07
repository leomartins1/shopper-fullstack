import * as Tooltip from '@radix-ui/react-tooltip';
import { IProduct } from '../../types';
import InvalidSVG from './assets/invalid.svg';
import ValidSVG from './assets/valid.svg';
import * as S from './styles';

const columns = [
  { name: 'code', label: 'Código' },
  { name: 'name', label: 'Nome' },
  { name: 'costPrice', label: 'Preço de custo' },
  { name: 'salesPrice', label: 'Preço de venda' },
];

type ProductsTableProps = {
  products: IProduct[];
};

export const ProductsTable = ({ products }: ProductsTableProps) => {
  return (
    <S.Table>
      <thead>
        <tr>
          {columns.map((column) => (
            <S.Th key={column.name}>{column.label}</S.Th>
          ))}
          <S.Th />
        </tr>
      </thead>
      <tbody>
        {products?.map((product) => (
          <tr key={product.code}>
            {columns.map((column) => (
              <S.Td key={product.code + column.name}>{product[column.name as keyof IProduct]}</S.Td>
            ))}
            <S.TDStatus>
              {product.wasValidated &&
                (product.invalid?.length && product.invalid?.length > 0 ? (
                  <Tooltip.Provider>
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                        <img src={InvalidSVG} alt='invalid' />
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <S.ToolTipContent side='left' sideOffset={5}>
                          {product.invalid.join('. ')}
                          <S.ToolTipArrow />
                        </S.ToolTipContent>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  </Tooltip.Provider>
                ) : (
                  <img src={ValidSVG} alt='valid' />
                ))}
            </S.TDStatus>
          </tr>
        ))}
      </tbody>
    </S.Table>
  );
};
