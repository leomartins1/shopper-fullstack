import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { validateFile } from '../../services/validate-file';
import * as S from './styles';
import { validateCSV } from './utils/validate-cvs';
import { IProduct } from '~/types';
import { updateProductsWithCSV } from '~/services/update-products';

type ProductsUpdateProps = {
  updateProducts: React.Dispatch<React.SetStateAction<IProduct[] | undefined>>;
};

export const ProductsUpdate = ({ updateProducts }: ProductsUpdateProps) => {
  const [file, setFile] = useState<File>();
  const [isValidated, setIsValidated] = useState(false);

  useEffect(() => {
    if (!file) {
      const fileNameDisplay = document.getElementById('fileName');
      if (!fileNameDisplay) return;

      fileNameDisplay.textContent = 'Nenhum arquivo selecionado';
      setIsValidated(false);
    }
  }, [file]);

  function updateFile(selectedFile: File) {
    const fileNameDisplay = document.getElementById('fileName');

    if (isValidated) {
      setIsValidated((prevState) => !prevState);
    }

    if (!fileNameDisplay) return;

    if (selectedFile) {
      setFile(selectedFile);
      fileNameDisplay.textContent = selectedFile.name;
    } else {
      fileNameDisplay.textContent = 'Nenhum arquivo selecionado';
    }
  }

  const handleValidate = async () => {
    if (!file) return;
    const isCSVValid = await validateCSV(file);
    if (isCSVValid) {
      const formData = new FormData();
      formData.append('csvFile', file, file.name);

      toast.loading('Validando arquivo...', { id: 'validate' });

      const productsValidates = await validateFile(formData);

      if (
        productsValidates.find((product) => product.invalid?.length && product.invalid?.length > 0)
      ) {
        toast.error('Arquivo possui erro(s) ', { id: 'validate' });
      } else {
        toast.success('Arquivo validado com sucesso!', { id: 'validate' });
        setIsValidated(true);
      }

      updateProducts((prevState) => {
        return prevState?.map((item) => {
          const validated = productsValidates.find((validate) => validate.code === item.code);
          if (validated) {
            return { ...validated };
          } else {
            return { ...item };
          }
        });
      });
    }
  };

  async function handleSubmit() {
    if (!file) return;
    const isCSVValid = await validateCSV(file);
    if (isCSVValid) {
      const formData = new FormData();
      formData.append('csvFile', file, file.name);

      toast.loading('Atualizando arquivos...', { id: 'update' });

      const productsValidates = await updateProductsWithCSV(formData);

      if (
        productsValidates.find((product) => product.invalid?.length && product.invalid?.length > 0)
      ) {
        toast.error('Arquivo possui erro(s) ', { id: 'update' });
        setIsValidated(false);
      } else {
        toast.success('Produtos atualizados com sucesso!', { id: 'update' });
        setIsValidated(true);
      }

      updateProducts((prevState) => {
        return prevState?.map((item) => {
          const validated = productsValidates.find((validate) => validate.code === item.code);
          if (validated) {
            return { ...validated };
          } else {
            return { ...item };
          }
        });
      });
    }
    setFile(undefined);
    return;
  }

  return (
    <S.Container>
      <S.FileContainer>
        <S.FileInput
          accept='.csv'
          type='file'
          onChange={(e) => {
            if (!e.target.files?.[0]) return;
            updateFile(e.target.files[0]);
            e.target.value = '';
          }}
        />
        <S.FileSpan>Adicione um arquivo</S.FileSpan>
        <S.FileName id='fileName'>Nenhum arquivo selecionado</S.FileName>
      </S.FileContainer>
      <S.CustomButton disabled={!file} validate onClick={handleValidate}>
        Validar
      </S.CustomButton>
      <S.CustomButton disabled={!isValidated} submit onClick={handleSubmit}>
        Atualizar
      </S.CustomButton>
    </S.Container>
  );
};
